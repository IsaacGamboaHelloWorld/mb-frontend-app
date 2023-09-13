import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as utf8 from 'utf8';

import { SecurityService } from '../services/security.service';
import { ContentFullConfigService } from '@commons/security/services/contentFull-config.service';
import { IUrlExcluded } from '@app/commons/constants/urls_excluded';
import { isExcludedUrl } from '@app/commons/helpers/filter-urls.helper';

@Injectable({
  providedIn: 'root'
})
export class EncryptionInterceptor implements HttpInterceptor {
  constructor(
    private securityService: SecurityService,
    @Inject(ContentFullConfigService) private urls_excluded: IUrlExcluded[]
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!isExcludedUrl(request.url, this.urls_excluded)) {
      return this._aesGcm(request, next);
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        throw error;
      })
    );
  }

  private _aesGcm(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<any> {
    const body: string = !!request.body ? JSON.stringify(request.body) : '';
    const body_utf8: string = utf8.encode(body);
    const hmac: string = this.securityService.hmac(
      request.method.toLowerCase() + body
    );

    return from(this.securityService.encryptAesGcm(body_utf8)).pipe(
      switchMap((encrypt: string) => {
        const header = request.headers.set('X-SECURITY-HMAC', hmac);

        const resp = request.clone({
          headers: header,
          responseType: 'text',
          body: encrypt
        });

        return next.handle(resp).pipe(
          switchMap(async (event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              let _body = '';

              if (!!event.body && event.body !== '') {
                _body = await this.securityService.decryptAesGcm(
                  event.body as string
                );
              }

              return event.clone({
                body: _body !== '' ? JSON.parse(utf8.decode(_body)) : _body
              });
            }
          })
        );
      }),
      catchError((error: HttpErrorResponse) => {
        return from(
          this.securityService.decryptAesGcm(!!error ? error.error : '')
        ).pipe(
          map((err: string) => {
            throw new HttpErrorResponse({
              error: !!err && err !== '' ? JSON.parse(utf8.decode(err)) : ''
            }).error;
          })
        );
      })
    );
  }
}
