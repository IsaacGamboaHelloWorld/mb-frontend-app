import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';

import { LOGIN } from '@commons/constants/navigatie-global';
import { AppFacade } from '@app/app.facade';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private facade: AppFacade) {}

  canActivate(): Observable<boolean> {
    return this.facade.isLogged$.pipe(
      delay(50),
      tap((isLoggedIn) => {
        !isLoggedIn && this.router.navigate([LOGIN]);
      }),
      map(() => true)
    );
  }
}
