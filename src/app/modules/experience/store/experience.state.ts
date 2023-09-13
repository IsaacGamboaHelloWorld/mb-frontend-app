import {
  IExperienceResponse,
  InitExperience
} from '@modules/experience/entities/experience.entities';
import { StepExperienceType } from '@modules/experience/constants/steps';

export const experienceFeatureName = 'experienceModuleState';

export interface IExperienceState {
  content: IExperienceResponse;
  information?: InitExperience;
  loading: boolean;
  error: boolean;
  completed: boolean;
  message: string;
}
