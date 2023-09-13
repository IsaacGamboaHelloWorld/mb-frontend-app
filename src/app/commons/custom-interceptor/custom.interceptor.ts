import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { TranslateService } from '@ngx-translate/core';
import { TRACE_ID } from '@commons/constants/global';
import { datadogRum } from '@datadog/browser-rum';
import { ModalService } from '@commons/services/modal.service';
import {
  LIST_CODE_BLOCK_PRODUCTS,
  LIST_URLS_BLOCK_PRODUCTS
} from '@commons/constants/block-products';
import { ModalProductBlockComponent } from '@commons/components/modal-product-block/modal-product-block.component';
import { environment } from '@environment/environment';

function trackTraceIdError(http: HttpResponse<any>): void {
  http.body.hasOwnProperty('success') &&
    !http.body.success &&
    !!http.headers.get(TRACE_ID) &&
    datadogRum.addError(
      {
        traceId: http.headers.get(TRACE_ID)
      },
      {
        url: window?.location?.href
      },
      'network'
    );
}

@Injectable()
export class CustomInterceptor implements HttpInterceptor {
  constructor(
    private translateService: TranslateService,
    private modalService: ModalService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req = req.clone({
      headers: req.headers.set('Content-Type', 'application/json')
    });

    return next.handle(req).pipe(
      map((data: HttpEvent<any>) => {
        if (data instanceof HttpResponse) {
          let hiddenToast = false;
          trackTraceIdError(data);
          if (
            LIST_URLS_BLOCK_PRODUCTS.includes(req.url) &&
            LIST_CODE_BLOCK_PRODUCTS.includes(req.body?.specificErrorCode)
          ) {
            hiddenToast = true;
            this.modal();
          }
          return data.clone({
            body: {
              ...data.body,
              hiddenToast
            }
          });
        }
      }),
      catchError((error: HttpErrorResponse) => {
        if (!error || error.constructor.name === SyntaxError.name) {
          throw new HttpErrorResponse({
            error: this.translateService.instant('ERRORS.GENERAL')
          });
        }
        throw error;
      })
    );
  }

  private modal(): void {
    this.modalService
      .openModal(ModalProductBlockComponent, {
        title: this.translateService.instant(
          'BLOCK_PRODUCT.MODAL.ACCOUNT_TYPE.TITLE_2'
        ),
        icon: 'icon-vel-warning-hex',
        close: false,
        iconType: 'warning',
        subtitle: this.translateService.instant(
          'BLOCK_PRODUCT.MODAL.ACCOUNT_TYPE.SUBTITLE'
        ),
        descriptionOne: this.translateService.instant(
          'BLOCK_PRODUCT.MODAL.ACCOUNT_TYPE.DESCRIPTION'
        ),
        descriptionTwo: this.translateService.instant(
          'BLOCK_PRODUCT.MODAL.ACCOUNT_TYPE.DESCRIPTION_TWO'
        ),
        link: environment.external_url.offices,
        linkText: this.translateService.instant(
          'BLOCK_PRODUCT.MODAL.ACCOUNT_TYPE.LINK'
        ),
        buttonText: this.translateService.instant('UNDERSTOOD')
      })
      .then();
  }
}
