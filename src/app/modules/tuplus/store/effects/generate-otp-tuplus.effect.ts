import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { catchError, map, switchMap, take } from 'rxjs/operators';

import * as actions from '@modules/tuplus/store/actions/generation-otp-tuplus.action';
import { OtpGenerationTuplusService } from '@modules/tuplus/services/otp-generation-tuplus.service';
import { IGenerationOtp } from '@modules/tuplus/entities/otp-generation-tuplus';

@Injectable()
export class GenerateOtpEffect {
  constructor(
    private actions$: Actions,
    private generateOtpService: OtpGenerationTuplusService
  ) {}

  GenerateOtpEffect: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.generateOtpLoadAction),
      switchMap((action) => {
        return this.generateOtpService.generateOtp().pipe(
          take(1),
          map((information: IGenerationOtp) => {
            if (information?.success) {
              return actions.generateOtpSuccessAction(information);
            }
            return actions.generateOtpFailAction(information?.errorMessage);
          }),
          catchError((_) => of(actions.generateOtpFailAction('')))
        );
      })
    )
  );
}
