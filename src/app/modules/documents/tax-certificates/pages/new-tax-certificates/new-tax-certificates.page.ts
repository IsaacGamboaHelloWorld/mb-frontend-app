import { Component, Injector, OnInit } from '@angular/core';
import { TaxCertificatesAbstract } from '@modules/documents/tax-certificates/utils/tax-certificates.abstract';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import {
  GMF,
  INCOME_DECLARATION_TC,
  ITypeTaxCertificate,
  NUMBER_OF_YEARS_LIST,
  RAC,
  TYPE_CERTIFICATES,
  WITHHOLDING_TAXES
} from '@commons/constants/documents';

@Component({
  selector: 'app-new-tax-certificates',
  templateUrl: './new-tax-certificates.page.html',
  styleUrls: ['./new-tax-certificates.page.sass']
})
export class NewTaxCertificatesPage extends TaxCertificatesAbstract
  implements OnInit {
  public formNewTaxCertificates: FormGroup;
  private _lastYears: string[] = [];
  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this._setYears();
    this._initForm();
  }

  get typeCertificate(): AbstractControl {
    return this.formNewTaxCertificates.get('typeCertificate');
  }

  get typeCertificates(): ITypeTaxCertificate[] {
    return TYPE_CERTIFICATES;
  }

  get hasTypeSelected(): boolean {
    return !!this.typeCertificate.value;
  }

  get isWithholdingTaxes(): boolean {
    return this.typeCertificate.value === WITHHOLDING_TAXES.value;
  }

  get isGMF(): boolean {
    return this.typeCertificate.value === GMF.value;
  }

  get isIncomeDeclarationTC(): boolean {
    return this.typeCertificate.value === INCOME_DECLARATION_TC.value;
  }

  get isWithholdingTaxesOrGMF(): boolean {
    return (
      this.typeCertificate.value === WITHHOLDING_TAXES.value ||
      this.typeCertificate.value === GMF.value ||
      this.typeCertificate.value === RAC.value
    );
  }

  get yearsList(): string[] {
    return this._lastYears;
  }

  public formSubmit(): void {
    this._fetchDocument();
  }

  private _initForm(): void {
    this.formNewTaxCertificates = this.fb.group({
      typeCertificate: [null, Validators.required],
      year: [this._lastYears[0]]
    });
  }

  private _setYears(): void {
    const currentYear = new Date();
    for (
      let i = currentYear.getFullYear() - 1;
      this._lastYears.length < NUMBER_OF_YEARS_LIST;
      i--
    ) {
      this._lastYears.push(i.toString());
    }
  }

  private _fetchDocument(): void {
    if (this.hasTypeSelected && this.formNewTaxCertificates.valid) {
      switch (this.formNewTaxCertificates.value.typeCertificate) {
        case GMF.value: {
          this.taxCertificatesFacade.fetchCertificateGMF(
            this.formNewTaxCertificates.value.year
          );
          break;
        }
        case INCOME_DECLARATION_TC.value: {
          this.taxCertificatesFacade.fetchCertificateTc();
          break;
        }
        case WITHHOLDING_TAXES.value: {
          this.taxCertificatesFacade.fetchCertificateIncomeTaxes(
            this.formNewTaxCertificates.value.year
          );
          break;
        }
        case RAC.value: {
          this.taxCertificatesFacade.fetchCertificateRAC(
            this.formNewTaxCertificates.value.year
          );
          break;
        }
      }
    }
  }
}
