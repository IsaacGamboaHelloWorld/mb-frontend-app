import {
  Component,
  Injector,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CertificatesAbstract } from '@modules/documents/certificates/utils/certificates.abstract';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates-product-detail.page.html',
  styleUrls: ['./certificates-product-detail.page.sass'],
  encapsulation: ViewEncapsulation.None
})
export class CertificatesProductDetailPage extends CertificatesAbstract
  implements OnInit, OnDestroy {
  public formGenerateCertificate: FormGroup;
  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this._initForm();
    this.detailProduct().then((product) => (this.productBasic = product));
  }

  ngOnDestroy(): void {
    this.certificatesFacade.resetCertificate();
  }

  public loadCertificate(): void {
    this.certificatesFacade.fetchCertificate(
      this.productBasic?.id,
      this.productBasic?.type?.toUpperCase(),
      this.formGenerateCertificate?.value?.balance,
      this.formGenerateCertificate?.value?.recipient
    );
  }

  private _initForm(): void {
    this.formGenerateCertificate = this.fb.group({
      balance: [false],
      recipient: ['']
    });
  }
}
