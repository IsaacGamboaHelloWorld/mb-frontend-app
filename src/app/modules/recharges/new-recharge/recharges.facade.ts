import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select } from '@ngrx/store';

import { MainContainerFacade } from '@modules/main-container/main-container.facade';
import { operatorsLoadAction } from '@modules/recharges/new-recharge/store/actions/operators.action';
import {
  rechargeLoadAction,
  rechargeResetAction
} from '@modules/recharges/new-recharge/store/actions/recharge.action';
import {
  operators,
  recharge
} from '@modules/recharges/new-recharge/store/recharges.selector';
import {
  IOperatorsState,
  IRechargeState
} from '@modules/recharges/new-recharge/store/recharges.state';
import { IRechargeService } from '@modules/recharges/new-recharge/entities/recharge.entities';

@Injectable()
export class RechargesFacade extends MainContainerFacade {
  public operators$: Observable<IOperatorsState> = this.store.pipe(
    select(operators)
  );

  public recharge$: Observable<IRechargeState> = this.store.pipe(
    select(recharge)
  );

  public fetchOperators(): void {
    this.store.dispatch(operatorsLoadAction());
  }

  public fetchRecharge(form: IRechargeService): void {
    this.store.dispatch(rechargeLoadAction(form));
  }

  public resetRecharge(): void {
    this.store.dispatch(rechargeResetAction());
  }
}
