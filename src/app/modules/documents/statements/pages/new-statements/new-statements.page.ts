import { Component, Injector, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';

import { StatementsAbstract } from '@modules/documents/statements/utils/statements.abstract';
import {
  periodMapper,
  statementsFileMapper
} from '@modules/documents/statements/mappers/statements.mapper';
import { IStatementFile } from '@modules/documents/statements/store/statements.state';

@Component({
  selector: 'app-new-statements',
  templateUrl: './new-statements.page.html',
  styleUrls: ['./new-statements.page.sass']
})
export class NewStatementsPage extends StatementsAbstract implements OnInit {
  public formNewStatements: FormGroup;
  private _selectedProductSubscription: Subscription;
  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this._initForm();
  }

  ionViewDidLeave(): void {
    this.statementsFacade.resetPeriods();
    this.statementsFacade.resetStatementsFile();
    this._selectedProductSubscription.unsubscribe();
  }

  get selectedProduct(): AbstractControl {
    return this.formNewStatements.get('selectedProduct');
  }

  get period(): AbstractControl {
    return this.formNewStatements.get('period');
  }

  get hasSelectedProduct(): boolean {
    return !!this.selectedProduct.value;
  }

  get statementsFile$(): Observable<IStatementFile> {
    return this.statementsFacade.statementsFile$;
  }

  public formSubmit(): void {
    if (this.formNewStatements.valid) {
      this.statementsFacade.fetchStatementsFile(
        statementsFileMapper(
          this.formNewStatements.value.selectedProduct?.accountInformation
            ?.accountIdentifier,
          this.formNewStatements.value.selectedProduct?.accountInformation
            ?.productType,
          this.formNewStatements.value.period
        )
      );
    }
  }

  private _initForm(): void {
    this.formNewStatements = this.fb.group({
      selectedProduct: [null, Validators.required],
      period: [null, Validators.required]
    });
    this._selectedProductSubscription = this.selectedProduct.valueChanges
      .pipe(
        filter((_val) => !!_val?.accountInformation),
        distinctUntilChanged()
      )
      .subscribe((product) => {
        this.statementsFacade.resetPeriods();
        this.statementsFacade.resetStatementsFile();
        this.statementsFacade.fetchPeriods(
          periodMapper(
            product?.accountInformation?.accountIdentifier,
            product?.accountInformation?.productType
          )
        );
      });
  }
}
