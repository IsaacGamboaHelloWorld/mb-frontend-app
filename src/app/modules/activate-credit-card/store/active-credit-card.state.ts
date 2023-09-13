import { IActiveCreditCardService } from '@modules/activate-credit-card/entities/active-block-credit-card.entities';

export const activeCreditCardFeatureName = 'activeBlockCreditCardModuleState';

export interface IActiveCreditCardState {
  information: IActiveCreditCardService;
  loading: boolean;
  completed: boolean;
  error: boolean;
  errorMessage: string;
}

export interface IActiveBlockCreditCardState {
  active: IActiveCreditCardState;
}
