import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { catchError, switchMap, takeUntil } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';

import { AuthSessionService } from '@commons/services/auth/auth-session.service';
import { URLS_EXCLUDED } from '@app/commons/constants/urls_excluded';
import {
  isExcludedUrl,
  requireSecurityHeaders
} from '@commons/helpers/filter-urls.helper';
import { SecurityService } from '@commons/security/services/security.service';
import { logoutUserSuccessAction } from '@store/actions/global.actions';
import { TRACE_ID } from '@commons/constants/global';
import { datadogRum } from '@datadog/browser-rum';

@Injectable()
export class MainInterceptor implements HttpInterceptor {
  constructor(
    private authSessionService: AuthSessionService,
    private securityService: SecurityService,
    private actions$: Actions
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return from(this.authSessionService.getToken()).pipe(
      switchMap((token: string) => {
        if (
          !isExcludedUrl(req.url, URLS_EXCLUDED) ||
          requireSecurityHeaders(req.url, URLS_EXCLUDED)
        ) {
          req = req.clone({
            headers: req.headers.set(
              'X-SECURITY-SESSION',
              this.securityService.symmetric?.id
            )
          });
        }
        if (!!token && !isExcludedUrl(req.url, URLS_EXCLUDED)) {
          req = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`)
          });
        }
        return next.handle(req).pipe(
          takeUntil(this.actions$.pipe(ofType(logoutUserSuccessAction))),
          catchError((error: HttpErrorResponse) => {
            !!error?.headers.get(TRACE_ID) &&
              datadogRum.addError(
                {
                  traceId: error.headers.get(TRACE_ID)
                },
                {
                  url: window?.location?.href
                },
                'network'
              );
            throw error;
          })
        );
      })
    );
  }
}
