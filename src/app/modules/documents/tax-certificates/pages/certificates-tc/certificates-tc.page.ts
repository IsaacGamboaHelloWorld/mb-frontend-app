import {
  Component,
  Injector,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ICertificateTCState } from '@modules/documents/tax-certificates/store/tax-certificates.state';
import { TaxCertificatesAbstract } from '@modules/documents/tax-certificates/utils/tax-certificates.abstract';

@Component({
  selector: 'app-certificates-tc',
  templateUrl: './certificates-tc.page.html',
  styleUrls: ['./certificates-tc.page.sass'],
  encapsulation: ViewEncapsulation.None
})
export class CertificatesTcPage extends TaxCertificatesAbstract
  implements OnInit, OnDestroy {
  public formGenerateCertificateTC: FormGroup;
  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this._initForm();
    this.detailProduct().then((product) => (this.productBasic = product));
  }

  ngOnDestroy(): void {
    this.taxCertificatesFacade.resetCertificateTc();
  }

  private _initForm(): void {
    this.formGenerateCertificateTC = this.fb.group({
      type: ['', [Validators.required]]
    });
  }

  public formSubmit(): void {
    this.taxCertificatesFacade.fetchCertificateTc();
  }
}
