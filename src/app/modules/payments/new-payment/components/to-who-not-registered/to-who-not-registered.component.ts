import {
  Component,
  Injector,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { distinctUntilChanged, filter, first, map } from 'rxjs/operators';
import { AbstractControl, Validators } from '@angular/forms';
import { combineLatest, interval, Observable, Subscription } from 'rxjs';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

import { ToWhoPaymentAbstractContainer } from '@modules/payments/utils/to-who-payment.abstract';
import { newPaymentFromValidator } from '@modules/payments/helpers/new-payment.validators';
import { PropertyTemplate } from '@commons/velocity/templates/utils/constants/urls-template.constant';
import { AgreementFinderComponent } from '@modules/payments/new-payment/components/agreement-finder/agreement-finder.component';
import { detailBillerMapper } from '@modules/payments/new-payment/mappers/confirmation-payment-not-registered.mapper';
import { IDetailBillerState } from '@modules/payments/store/payments.state';
import { ModalService } from '@commons/services/modal.service';
import { VelocityLoaderComponent } from '@commons/velocity/molecules/velocity-loader/velocity-loader.component';
import { ModalCustomComponent } from '@modules/payments/new-payment/components/modal-custom/modal-custom.component';
import { environment } from '@environment/environment';

@Component({
  selector: 'app-to-who-not-registered',
  templateUrl: './to-who-not-registered.component.html',
  styleUrls: ['./to-who-not-registered.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class ToWhoNotRegisteredComponent extends ToWhoPaymentAbstractContainer
  implements OnInit, OnDestroy {
  private _subs: Subscription[] = [];
  constructor(
    protected injector: Injector,
    private modalService: ModalService,
    private barcode: BarcodeScanner
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._initForm();
  }

  ngOnDestroy(): void {
    this._subs.length > 0 && this._subs.forEach((item) => item.unsubscribe());
  }

  get detailBiller$(): Observable<IDetailBillerState> {
    return this.paymentsFacade.detailBiller$;
  }

  get company(): AbstractControl {
    return this.formToWhoPayment.get('company');
  }

  get reference(): AbstractControl {
    return this.formToWhoPayment.get('reference');
  }

  get biller(): AbstractControl {
    return this.formToWhoPayment.get('biller');
  }

  get scanBarcode(): boolean {
    return !environment.scanBarcode;
  }

  public async openBarcode(): Promise<void> {
    try {
      const barcode = await this.barcode.scan({
        orientation: 'landscape',
        formats: 'CODE_128',
        prompt: this.translateService.instant(
          'PAYMENT.NOT_REGISTERED.TO_WHO.BARCODE'
        )
      });

      if (!!barcode?.text && barcode?.text !== '') {
        this.company.reset();
        this.reference.reset();
        this.biller.reset();

        await this.modalService.openModal(
          VelocityLoaderComponent,
          {},
          'default-modal',
          false
        );

        this.paymentsFacade.fetchBarcodeBiller({ barCode: barcode?.text });

        combineLatest([this.paymentsFacade.barcodeBiller$, interval(1000)])
          .pipe(
            filter(
              ([barcodeDetail, _]) =>
                barcodeDetail.completed || barcodeDetail.error
            ),
            first()
          )
          .subscribe(([barcodeDetail, _]) => {
            !!this.modalService.modal && this.modalService.close();
            if (barcodeDetail.completed) {
              this.reference.setValue(barcodeDetail.information?.contract);
              this.company.setValue(barcodeDetail.information);
              this.biller.setValue(barcodeDetail.information);
            }
          });
      }
    } catch {
      await this.modalService.openModal(
        ModalCustomComponent,
        {
          title: this.translateService.instant(
            'PAYMENT.NOT_REGISTERED.ERROR_BARCODE.TITLE'
          ),
          description: this.translateService.instant(
            'PAYMENT.NOT_REGISTERED.ERROR_BARCODE.DESCRIPTION'
          ),
          firstBtn: this.translateService.instant(
            'PAYMENT.NOT_REGISTERED.ERROR_BARCODE.BTN'
          )
        },
        'default-modal',
        true
      );
    }
  }

  public submitForm(): void {
    if (this.formToWhoPayment.valid) {
      if (!!this.biller.value) {
        this._redirectStep();
      } else {
        this.paymentsFacade.fetchDetailBiller(
          detailBillerMapper(
            this.company?.value?.organizationId,
            this.reference.value
          )
        );
        this.detailBiller$
          .pipe(
            filter((data) => data.completed),
            map((data) => data.information),
            first()
          )
          .subscribe((data) => {
            this.biller.setValue(data);
            this._redirectStep();
          });
      }
    }
  }

  public openFinder(): void {
    this.modalService.openModal(AgreementFinderComponent, {}, '', false);
  }

  private _initForm(): void {
    this.formToWhoPayment = this.fb.group({
      from: [
        this.saveDataTemplateService.dataTemplate?.toWho?.from || null,
        [Validators.required, newPaymentFromValidator.bind(this)]
      ],
      company: [
        this.saveDataTemplateService.dataTemplate?.toWho?.company || null,
        Validators.required
      ],
      reference: [
        this.saveDataTemplateService.dataTemplate?.toWho?.reference || null,
        Validators.required
      ],
      biller: [this.saveDataTemplateService.dataTemplate?.toWho?.biller || null]
    });
    this.setProduct();
    this._subs.push(
      this.modalService.actionCloseModal$
        .pipe(
          filter((data) => !!data && !!data?.value),
          map((info) => info.value),
          distinctUntilChanged()
        )
        .subscribe((data) => {
          this.company.setValue(data.selectedItem);
          this.reference.reset();
          this.biller.reset();
        })
    );
  }

  private _redirectStep(): void {
    this.saveDataTemplateService.saveDataTemplate({
      ...this.saveDataTemplateService.dataTemplate,
      toWho: {
        ...this.formToWhoPayment.value
      },
      stepActive: PropertyTemplate.howMuch
    });
    this.configTemplate.changeStep(this.configTemplate.config.router[1]);
  }
}
