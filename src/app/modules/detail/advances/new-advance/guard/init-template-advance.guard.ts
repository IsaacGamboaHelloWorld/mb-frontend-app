import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

import { AdvancesFacade } from '@modules/detail/advances/new-advance/advances.facade';
import { ConfigTemplateService } from '@commons/velocity/templates/utils/services/config-template.service';
import { CONFIG_TEMPLATE_ADVANCES } from '@modules/detail/advances/new-advance/constants/config.constant';

@Injectable()
export class InitTemplateAdvanceGuard implements CanActivate {
  constructor(
    private facade: AdvancesFacade,
    private configTemplate: ConfigTemplateService
  ) {}

  canActivate(): Observable<boolean> {
    return this.facade.beforeUrl$.pipe(take(1)).pipe(
      take(1),
      tap((beforeUrl) => {
        this.configTemplate.setConfig({
          ...CONFIG_TEMPLATE_ADVANCES,
          beforeUrl
        });
      }),
      map(() => true)
    );
  }
}
