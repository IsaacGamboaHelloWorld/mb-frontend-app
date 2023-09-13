import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select } from '@ngrx/store';

import { MainContainerFacade } from '@modules/main-container/main-container.facade';
import { IMovementsTuplusState } from '@modules/tuplus/store/states/movements-tuplus.state';
import {
  configurationFactor,
  generateOtp,
  movements,
  redeem,
  sourcePath
} from '@modules/tuplus/store/tuplus.selector';
import {
  movementsTuplusLoadAction,
  movementsTuplusResetAction
} from '@modules/tuplus/store/actions/movement-tuplus.action';
import { IConfigurationFactorState } from '@modules/tuplus/store/states/configuration-factor.state';
import { conversionLoadAction } from '@modules/tuplus/store/actions/conversion-factor.action';
import { redeemLoadAction } from '@modules/tuplus/store/actions/redemption-tuplus.action';
import { IRedeemPointsState } from '@modules/tuplus/store/states/redeem-tuplus.state';
import { generateOtpLoadAction } from '@modules/tuplus/store/actions/generation-otp-tuplus.action';
import { IGenerateOtpState } from '@modules/tuplus/store/states/generate-otp-tuplus.state';
import { IRedeemBody } from '@modules/tuplus/entities/redeem-tuplus.entities';
import { IRequestMovements } from '@modules/tuplus/entities/movement-tuplus.entities';
import { logoutLoadAction } from '@modules/tuplus/store/actions/logout-tuplus.action';
import {
  resetSourcePathAction,
  setSourcePathAction
} from '@modules/tuplus/store/actions/source-path.action';

@Injectable()
export class TuplusFacade extends MainContainerFacade {
  public movements$: Observable<IMovementsTuplusState> = this.store.pipe(
    select(movements)
  );

  public conversionFactor$: Observable<
    IConfigurationFactorState
  > = this.store.pipe(select(configurationFactor));

  public redeemPoints$: Observable<IRedeemPointsState> = this.store.pipe(
    select(redeem)
  );

  public generateOtp$: Observable<IGenerateOtpState> = this.store.pipe(
    select(generateOtp)
  );

  public originUrl$: Observable<string> = this.store.pipe(select(sourcePath));

  public fetchMovements(requestBody: IRequestMovements): void {
    this.store.dispatch(movementsTuplusLoadAction(requestBody));
  }

  public fetchRedeem(form: IRedeemBody): void {
    this.store.dispatch(redeemLoadAction(form));
  }

  public fetchConversionFactor(): void {
    this.store.dispatch(conversionLoadAction());
  }

  public fetchGenerateOtp(): void {
    this.store.dispatch(generateOtpLoadAction());
  }

  public resetMovements(): void {
    this.store.dispatch(movementsTuplusResetAction());
  }

  public fetchLogoutTuplus(): void {
    this.store.dispatch(logoutLoadAction());
  }
  public fetchSourcePath(url): void {
    this.store.dispatch(setSourcePathAction(url));
  }

  public resetSourcePath(): void {
    this.store.dispatch(resetSourcePathAction());
  }
}
