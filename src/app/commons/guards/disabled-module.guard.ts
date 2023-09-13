import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { ConfigService } from '@commons/services/config.service';
import { AppFacade } from '@app/app.facade';
import {
  NOT_COMPLEMENTARY_ITEMS,
  NOT_COMPLEMENTARY_URLS
} from '@commons/constants/menu_items';
import { environment } from '@environment/environment';

@Injectable()
export class DisabledModuleGuard implements CanActivateChild {
  constructor(
    private configService: ConfigService,
    private router: Router,
    private facade: AppFacade
  ) {}
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.facade.complementary$.pipe(
      delay(50),
      map((complementary: boolean) => {
        const key = NOT_COMPLEMENTARY_URLS.find(
          (item) => state.url === item.url
        );

        let enabled = true;
        let hasPermissions = true;

        if (next.routeConfig?.data?.hasOwnProperty('parent')) {
          const accessParent = this.configService.config.find(
            (item) => item.id === next.routeConfig?.data?.parent
          );
          !!accessParent && (enabled = accessParent.enabled);
        }

        if (!!key) {
          hasPermissions =
            complementary || !environment.validateComplementary
              ? true
              : !NOT_COMPLEMENTARY_ITEMS.includes(key.id);
        }

        (!enabled || !hasPermissions) && this.router.navigate(['/']);

        return enabled && hasPermissions;
      })
    );
  }
}
