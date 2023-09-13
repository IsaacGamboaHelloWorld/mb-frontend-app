import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';

import { ConfigTemplateService } from '@commons/velocity/templates/utils/services/config-template.service';

@Injectable()
export class StepGuard implements CanActivate {
  constructor(
    private router: Router,
    private configTemplate: ConfigTemplateService
  ) {}

  canActivate(): Observable<boolean> {
    return of(null).pipe(
      delay(50),
      tap(() => {
        if (this.configTemplate.step <= 1) {
          this.router.navigate([this.configTemplate?.config?.defaultUrl]);
          this.configTemplate.setStep(1);
        }
      }),
      map(() => true)
    );
  }
}
