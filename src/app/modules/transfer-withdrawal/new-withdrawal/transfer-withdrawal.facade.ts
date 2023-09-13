import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select } from '@ngrx/store';

import { MainContainerFacade } from '@modules/main-container/main-container.facade';
import { IOtpWithdrawal } from '@modules/transfer-withdrawal/new-withdrawal/entities/otp-transfer-withdrawal.entities';
import {
  transferWithdrawalLoadAction,
  transferWithdrawalResetAction
} from '@modules/transfer-withdrawal/new-withdrawal/store/transfer-withdrawal.action';
import { ITransferWithdrawalState } from '@modules/transfer-withdrawal/new-withdrawal/store/transfer-withdrawal.state';
import { transferWithdrawal } from '@modules/transfer-withdrawal/new-withdrawal/store/transfer-withdrawal.selector';

@Injectable()
export class TransferWithdrawalFacade extends MainContainerFacade {
  public transferWithdrawal$: Observable<
    ITransferWithdrawalState
  > = this.store.pipe(select(transferWithdrawal));

  public fetchTransferWithdrawal(form: IOtpWithdrawal): void {
    this.store.dispatch(transferWithdrawalLoadAction(form));
  }

  public resetTransferWithdrawal(): void {
    this.store.dispatch(transferWithdrawalResetAction());
  }
}
