import { SharedDownloadFileAbstract } from '@modules/documents/utils/shared-download-file.abstract';
import { Observable } from 'rxjs';
import {
  IPeriods,
  IStatementFile
} from '@modules/documents/statements/store/statements.state';
import { StatementsFacade } from '@modules/documents/statements/statements.facade';
import { Injectable, Injector } from '@angular/core';
import { map } from 'rxjs/operators';
import { Product } from '@commons/models/product.model';
import { GROUP_TWO } from '@commons/constants/group-products';

@Injectable()
export abstract class StatementsAbstract extends SharedDownloadFileAbstract {
  protected statementsFacade: StatementsFacade;

  protected constructor(protected injector: Injector) {
    super(injector);
    this.statementsFacade = this.injector.get(StatementsFacade);
  }

  get products$(): Observable<Product[]> {
    return this.statementsFacade.filterProducts$(GROUP_TWO);
  }

  get periods$(): Observable<IPeriods> {
    return this.statementsFacade.periods$;
  }

  get hasPeriods$(): Observable<boolean> {
    return this.periods$.pipe(map((periods) => periods?.periods.length > 0));
  }

  get statement$(): Observable<IStatementFile> {
    return this.statementsFacade.statementsFile$;
  }
}
