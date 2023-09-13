import { Component, Injector, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

import { CertificatesAbstract } from '@modules/documents/certificates/utils/certificates.abstract';

@Component({
  selector: 'app-new-certificates',
  templateUrl: './new-certificates.page.html',
  styleUrls: ['./new-certificates.page.sass']
})
export class NewCertificatesPage extends CertificatesAbstract
  implements OnInit {
  public formNewCertificates: FormGroup;
  private _selectedProductSubscription: Subscription;
  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this._initForm();
  }

  ionViewDidLeave(): void {
    this.certificatesFacade.resetCertificate();
    this._selectedProductSubscription.unsubscribe();
  }

  get selectedProduct(): AbstractControl {
    return this.formNewCertificates.get('selectedProduct');
  }

  get hasSelectedProduct(): boolean {
    return !!this.selectedProduct.value;
  }

  public formSubmit(): void {
    this.certificatesFacade.fetchCertificate(
      this.formNewCertificates.value.selectedProduct?.accountInformation
        ?.accountIdentifier,
      this.formNewCertificates.value.selectedProduct?.accountInformation
        ?.productType,
      this.formNewCertificates?.value?.balance,
      this.formNewCertificates?.value?.recipient
    );
  }

  private _initForm(): void {
    this.formNewCertificates = this.fb.group({
      selectedProduct: [null, Validators.required],
      balance: [false],
      recipient: ['']
    });
    this._selectedProductSubscription = this.selectedProduct.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe(() => this.certificatesFacade.resetCertificate());
  }
}
