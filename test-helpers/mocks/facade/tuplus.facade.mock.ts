import { Injectable } from '@angular/core';
import { MainContainerFacadeMock } from '@test-helpers/mocks/facade/main-container.facade.mock';
import { BehaviorSubject, Observable } from 'rxjs';
import { ITuplusState } from '@modules/main-container/store/states/main-container.state';
import { IMovementsTuplusState } from '@modules/tuplus/store/states/movements-tuplus.state';
import { IConfigurationFactorState } from '@app/modules/tuplus/store/states/configuration-factor.state';
import { IRedeemPointsState } from '@modules/tuplus/store/states/redeem-tuplus.state';
import { IGenerateOtpState } from '@app/modules/tuplus/store/states/generate-otp-tuplus.state';

@Injectable()
export class TuplusFacadeMock extends MainContainerFacadeMock {
  public movements$: Observable<IMovementsTuplusState> = new BehaviorSubject(
    null
  );
  public conversionFactor$: Observable<
    IConfigurationFactorState
  > = new BehaviorSubject(null);
  public redeemPoints$: Observable<IRedeemPointsState> = new BehaviorSubject(
    null
  );
  public generateOtp$: Observable<IGenerateOtpState> = new BehaviorSubject(
    null
  );

  public tuplusBalance$: Observable<ITuplusState> = new BehaviorSubject(null);

  public goHome = new BehaviorSubject(null);

  public tuplus$: Observable<ITuplusState> = new BehaviorSubject(null);

  public fetchMovements(): void {}

  public fetchRedeem(): void {}

  public fetchGenerateOtp(): void {}

  public back(): void {}

  public fetchConversionFactor(): void {
    return null;
  }
  public fetchSourcePath(): void {}

  public resetSourcePath(): void {}

  public setTuplus(tuplus: ITuplusState): void {}
}
