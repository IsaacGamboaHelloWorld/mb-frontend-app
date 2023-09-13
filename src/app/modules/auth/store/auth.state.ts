import {
  IEnrollmentResponse,
  InitAuth
} from '@modules/auth/entities/auth.interface';
import { StepEnrollmentType } from '@modules/auth/constants/step';

export const authFeatureName = 'authModuleState';

export interface IEnrollmentState {
  content: IEnrollmentResponse;
  information?: InitAuth;
  loading: boolean;
  error: boolean;
  completed: boolean;
  message: string;
}

export const initialEnrollmentState: IEnrollmentState = {
  content: {
    processId: null,
    step: StepEnrollmentType.INIT,
    success: false
  },
  information: null,
  loading: false,
  error: false,
  completed: false,
  message: ''
};
