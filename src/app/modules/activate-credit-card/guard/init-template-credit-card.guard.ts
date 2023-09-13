import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

import { ConfigTemplateService } from '@commons/velocity/templates/utils/services/config-template.service';
import { CONFIG_TEMPLATE_ACTIVE_PRODUCT } from '@modules/activate-credit-card/constants/config.constant';

@Injectable()
export class InitTemplateCreditCardGuard implements CanActivate {
  constructor(private configTemplate: ConfigTemplateService) {}

  canActivate(): Observable<boolean> {
    return of('').pipe(
      take(1),
      tap(() => {
        this.configTemplate.setConfig({
          ...CONFIG_TEMPLATE_ACTIVE_PRODUCT
        });
      }),
      map(() => true)
    );
  }
}
