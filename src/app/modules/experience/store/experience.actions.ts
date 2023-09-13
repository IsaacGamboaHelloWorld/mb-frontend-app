import { createAction, props } from '@ngrx/store';

import { type } from '@app/commons/utils/util';
import {
  IExperienceResponse,
  IStartExperience
} from '@modules/experience/entities/experience.entities';

export const experienceLoadAction = createAction(
  type('[EXPERIENCE / API] Fetch EXPERIENCE'),
  props<{ experienceData: IStartExperience }>()
);

export const experienceStepSuccessAction = createAction(
  type('[EXPERIENCE / API] Fetch EXPERIENCE success'),
  props<{ content: IExperienceResponse }>()
);

export const experienceStepErrorAction = createAction(
  type('[EXPERIENCE / API] Fetch EXPERIENCE error')
);

export const experienceResetAction = createAction(
  type('[EXPERIENCE / API] Reset EXPERIENCE')
);
