import { Injectable } from '@angular/core';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { MainContainerFacade } from '@modules/main-container/main-container.facade';
import {
  periodLoadAction,
  periodResetAction
} from '@modules/documents/statements/store/actions/periods.action';
import {
  IPeriods,
  IStatementFile
} from '@modules/documents/statements/store/statements.state';
import {
  periods,
  statementsFile
} from '@modules/documents/statements/store/statements.selector';
import {
  IServicePeriod,
  IServiceStatementFile
} from '@modules/documents/statements/entities/statements.entities';
import {
  statementsLoadAction,
  statementsResetAction
} from '@modules/documents/statements/store/actions/statements.action';

@Injectable()
export class StatementsFacade extends MainContainerFacade {
  public periods$: Observable<IPeriods> = this.store.pipe(select(periods));

  public statementsFile$: Observable<IStatementFile> = this.store.pipe(
    select(statementsFile)
  );

  public fetchPeriods(body: IServicePeriod): void {
    return this.store.dispatch(periodLoadAction(body));
  }
  public fetchStatementsFile(body: IServiceStatementFile): void {
    return this.store.dispatch(statementsLoadAction(body));
  }

  public resetPeriods(): void {
    this.store.dispatch(periodResetAction());
  }

  public resetStatementsFile(): void {
    this.store.dispatch(statementsResetAction());
  }
}
