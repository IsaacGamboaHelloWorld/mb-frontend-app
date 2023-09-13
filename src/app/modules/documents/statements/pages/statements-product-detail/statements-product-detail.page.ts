import { Component, Injector, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

import { StatementsFacade } from '@modules/documents/statements/statements.facade';
import {
  periodMapper,
  statementsFileMapper
} from '@modules/documents/statements/mappers/statements.mapper';
import { TYPE_ACCOUNTS } from '@commons/constants/types_account';
import { StatementsAbstract } from '@modules/documents/statements/utils/statements.abstract';

@Component({
  selector: 'app-statements-product-detail',
  templateUrl: './statements-product-detail.page.html',
  styleUrls: ['./statements-product-detail.page.sass'],
  encapsulation: ViewEncapsulation.None
})
export class StatementsProductDetailPage extends StatementsAbstract
  implements OnInit {
  public formGenerateExtracts: FormGroup;
  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this._initForm();
    this.detailProduct().then((product) => {
      this.productBasic = product;
      this.statementsFacade.fetchPeriods(
        periodMapper(this.productBasic?.id, this.productBasic?.type)
      );
    });
  }

  get isTC(): boolean {
    return this.productBasic?.type?.toUpperCase() === TYPE_ACCOUNTS.CREDIT_CARD;
  }

  public fetchStatement(isPeriod: boolean): void {
    isPeriod
      ? this.statementsFacade.fetchPeriods(
          periodMapper(this.productBasic.id, this.productBasic.type)
        )
      : this.formGenerateExtracts.valid &&
        this.statementsFacade.fetchStatementsFile(
          statementsFileMapper(
            this.productBasic.id,
            this.productBasic.type,
            this.formGenerateExtracts.value.period
          )
        );
  }

  private _initForm(): void {
    this.formGenerateExtracts = this.fb.group({
      period: [null, Validators.required]
    });
  }
}
