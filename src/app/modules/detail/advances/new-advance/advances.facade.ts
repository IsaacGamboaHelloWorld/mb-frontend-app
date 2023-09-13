import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select } from '@ngrx/store';

import { MainContainerFacade } from '@modules/main-container/main-container.facade';
import { IAdvanceState } from '@modules/detail/advances/new-advance/store/advances.state';
import { advanceTransfer } from '@modules/detail/advances/new-advance/store/advances.selector';
import { IAdvanceService } from '@modules/detail/advances/new-advance/entities/advances.entities';
import {
  advanceLoadAction,
  advanceResetAction
} from '@modules/detail/advances/new-advance/store/advances.action';

@Injectable()
export class AdvancesFacade extends MainContainerFacade {
  public advance$: Observable<IAdvanceState> = this.store.pipe(
    select(advanceTransfer)
  );

  public fetchAdvance(form: IAdvanceService): void {
    this.store.dispatch(advanceLoadAction(form));
  }

  public resetAdvance(): void {
    this.store.dispatch(advanceResetAction());
  }
}
