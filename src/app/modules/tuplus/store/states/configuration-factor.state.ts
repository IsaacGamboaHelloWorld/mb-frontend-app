import { IConversionFactor } from '@modules/tuplus/entities/conversion-factor.entities';

export interface IConfigurationFactorState {
  information: IConversionFactor;
  loading: boolean;
  completed: boolean;
  error: boolean;
  errorMessage: string;
}
