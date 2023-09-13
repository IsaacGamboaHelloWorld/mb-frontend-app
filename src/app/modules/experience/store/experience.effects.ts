import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap, switchMap, take } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { NavController } from '@ionic/angular';

import * as actions from '@modules/experience/store/experience.actions';
import { IExperienceResponse } from '@modules/experience/entities/experience.entities';
import { ExperienceFacade } from '@modules/experience/experience.facade';
import { redirectExperience } from '@modules/experience/mappers/redirect.mapper';
import { HOME } from '@commons/constants/navigatie-global';
import { ExperienceService } from '@modules/experience/services/experience.service';
import * as globalActions from '@store/actions/global.actions';
import { StepExperienceType } from '@modules/experience/constants/steps';

@Injectable()
export class ExperienceEffect {
  constructor(
    private navController: NavController,
    private actions$: Actions,
    private service: ExperienceService,
    private facade: ExperienceFacade
  ) {}

  LoadExperienceEffect: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.experienceLoadAction),
      switchMap((action) =>
        this.service.experience(action.experienceData).pipe(
          take(1),
          mergeMap((content: IExperienceResponse) => {
            redirectExperience(content, this.navController, this.facade);
            return content.step === StepExperienceType.COMPLETED &&
              !!content.complementary
              ? [
                  actions.experienceStepSuccessAction({ content }),
                  globalActions.turnOnComplementaryAction()
                ]
              : [actions.experienceStepSuccessAction({ content })];
          }),
          catchError((_: HttpErrorResponse) => {
            this.navController.navigateRoot([HOME]);
            return of(actions.experienceStepErrorAction());
          })
        )
      )
    )
  );
}
