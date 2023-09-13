import { Injectable } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import { Observable } from 'rxjs';
import { select } from '@ngrx/store';

import { IStartExperience } from '@modules/experience/entities/experience.entities';
import { IExperienceState } from '@modules/experience/store/experience.state';
import { contentExperienceSelector } from '@modules/experience/store/experience.selector';
import {
  experienceLoadAction,
  experienceResetAction,
  experienceStepErrorAction
} from '@modules/experience/store/experience.actions';

@Injectable()
export class ExperienceFacade extends AppFacade {
  public contentExperience$: Observable<IExperienceState> = this.store.pipe(
    select(contentExperienceSelector)
  );

  public fetchStartExperience(experienceData: IStartExperience): void {
    this.store.dispatch(experienceLoadAction({ experienceData }));
  }

  public resetExperience(): void {
    this.store.dispatch(experienceResetAction());
  }

  public setErrorExperience(): void {
    this.store.dispatch(experienceStepErrorAction());
  }
}
