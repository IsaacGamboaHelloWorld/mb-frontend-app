import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import {
  IPeriods,
  IStatementFile
} from '@modules/documents/statements/store/statements.state';
import { initPeriod } from '@modules/documents/statements/store/reducers/period.reducer';
import { initStatements } from '@modules/documents/statements/store/reducers/statements.reducer';
import { MainContainerFacadeMock } from '@test-helpers/mocks/facade/main-container.facade.mock';

@Injectable()
export class StatementsFacadeMock extends MainContainerFacadeMock {
  public periods$: Observable<IPeriods> = new BehaviorSubject(initPeriod);
  public statementsFile$: Observable<IStatementFile> = new BehaviorSubject(
    initStatements
  );
  public fetchPeriods(): void {}
  public fetchStatementsFile(): void {}
  public resetPeriods(): void {}
  public resetStatementsFile(): void {}
}
