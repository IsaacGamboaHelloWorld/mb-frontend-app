import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { first, map } from 'rxjs/operators';

import { TuplusFacade } from '@modules/tuplus/tuplus.facade';
import { TUPLUS } from '@commons/constants/global';

@Injectable()
export class GuardWhereToRedeemGuard implements CanActivate {
  constructor(private facade: TuplusFacade) {}

  canActivate(): Observable<boolean> {
    return this.facade.tuplusBalance$.pipe(
      first(),
      map((data) => data?.information?.totalPoints >= TUPLUS.MIN_POINTS)
    );
  }
}
