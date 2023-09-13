import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { IStartExperience } from '@modules/experience/entities/experience.entities';
import { initialExperienceState } from '@modules/experience/store/experience.reducer';
import { IExperienceState } from '@modules/experience/store/experience.state';
import { MainContainerFacadeMock } from '@test-helpers/mocks/facade/main-container.facade.mock';

@Injectable()
export class ExperienceFacadeMock extends MainContainerFacadeMock {
  public contentExperience$: Observable<IExperienceState> = new BehaviorSubject(
    initialExperienceState
  );

  public fetchStartExperience(experienceData: IStartExperience): void {}
  public resetExperience(): void {}

  public setErrorExperience(): void {}
}
