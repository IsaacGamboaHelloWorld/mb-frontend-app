import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  experienceFeatureName,
  IExperienceState
} from '@modules/experience/store/experience.state';

const ExperienceState = createFeatureSelector<IExperienceState>(
  experienceFeatureName
);

export const contentExperienceSelector = createSelector(
  ExperienceState,
  (state: IExperienceState) => state
);
