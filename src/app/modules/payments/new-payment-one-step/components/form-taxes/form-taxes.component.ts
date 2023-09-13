import {
  Component,
  Injector,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { AbstractControl, Validators } from '@angular/forms';
import { combineLatest, interval, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, filter, first, map } from 'rxjs/operators';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

import { newPaymentFromValidator } from '@modules/payments/helpers/new-payment.validators';
import { PropertyTemplate } from '@commons/velocity/templates/utils/constants/urls-template.constant';
import { ModalService } from '@commons/services/modal.service';
import { CityFinderComponent } from '@modules/payments/new-payment-one-step/components/city-finder/city-finder.component';
import { ToWhoPaymentAbstractContainer } from '@modules/payments/utils/to-who-payment.abstract';
import { VelocityLoaderComponent } from '@commons/velocity/molecules/velocity-loader/velocity-loader.component';
import { ModalCustomComponent } from '@modules/payments/new-payment/components/modal-custom/modal-custom.component';
import { ISaveDataTemplate } from '@commons/velocity/templates/utils/entities/save.data.entities';
import { taxesPaymentConfirmationMapper } from '@modules/payments/new-payment-one-step/mappers/taxes-confirmation.mapper';
import {
  taxesAgreementsServiceMapper,
  taxesAmountReferenceServiceMapper
} from '@modules/payments/new-payment-one-step/mappers/taxes-payment.mapper';
import { ITaxesAgreementsState } from '@modules/payments/store/payments.state';
import { environment } from '@environment/environment';

@Component({
  selector: 'app-form-taxes',
  templateUrl: './form-taxes.component.html',
  styleUrls: ['./form-taxes.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class FormTaxesComponent extends ToWhoPaymentAbstractContainer
  implements OnInit, OnDestroy {
  private _destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    protected injector: Injector,
    private modalService: ModalService,
    private barcode: BarcodeScanner
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._initForm();
    this.paymentsFacade.fetchTaxesCities();
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  get city(): AbstractControl {
    return this.formToWhoPayment.get('city');
  }

  get tax(): AbstractControl {
    return this.formToWhoPayment.get('tax');
  }

  get reference(): AbstractControl {
    return this.formToWhoPayment.get('reference');
  }

  get biller(): AbstractControl {
    return this.formToWhoPayment.get('biller');
  }

  get isBarcode(): AbstractControl {
    return this.formToWhoPayment.get('isBarcode');
  }

  get scanBarcode(): boolean {
    return !environment.scanBarcode;
  }

  get isLoadingReference$(): Observable<boolean> {
    return this.paymentsFacade.taxesAmountReference$?.pipe(
      map((data) => data.loading)
    );
  }

  get taxesByCity$(): Observable<ITaxesAgreementsState> {
    return this.paymentsFacade.taxesAgreements$;
  }

  get hasSelectedCity(): boolean {
    return !!this.city.value;
  }

  get hasSelectedAgreement(): boolean {
    return !!this.tax.value;
  }

  public openFinder(): void {
    this.modalService.openModal(CityFinderComponent, {}, '', false);
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
        this.city.reset();
        this.tax.reset();
        this.reference.reset();
        this.biller.reset();

        await this.modalService.openModal(
          VelocityLoaderComponent,
          {},
          'default-modal',
          false
        );

        this.paymentsFacade.fetchBarcodeBiller({ barCode: barcode?.text });

        combineLatest([this.paymentsFacade.barcodeBiller$, interval(2000)])
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
              this.biller.setValue(barcodeDetail.information);
              this.isBarcode.setValue(true);
              this._redirectStep();
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
      this.isBarcode.setValue(false);
      if (!!this.biller.value) {
        this._redirectStep();
      } else {
        this.paymentsFacade.fetchTaxesAmountReference(
          taxesAmountReferenceServiceMapper(
            this.reference?.value,
            this.tax?.value?.organizationIdType
          )
        );
        this.paymentsFacade.taxesAmountReference$
          .pipe(
            filter((data) => data.completed),
            map((data) => data.amountReference),
            first()
          )
          .subscribe((data) => {
            this.biller.setValue(data);
            this._redirectStep();
          });
      }
    }
  }

  private _initForm(): void {
    this.formToWhoPayment = this.fb.group({
      from: [
        this.saveDataTemplateService.dataTemplate?.toWho?.from || null,
        [Validators.required, newPaymentFromValidator.bind(this)]
      ],
      city: [
        this.saveDataTemplateService.dataTemplate?.toWho?.city || null,
        Validators.required
      ],
      tax: [
        this.saveDataTemplateService?.dataTemplate?.toWho?.tax?.value || null,
        [Validators.required]
      ],
      reference: [
        this.saveDataTemplateService.dataTemplate?.toWho?.reference || null,
        Validators.required
      ],
      biller: [
        this.saveDataTemplateService.dataTemplate?.toWho?.biller || null
      ],
      isBarcode: [null]
    });
    this.setProduct();
    this.modalService.actionCloseModal$
      .pipe(
        filter((data) => !!data && !!data?.value),
        map((info) => info.value),
        distinctUntilChanged()
      )
      .subscribe((data) => {
        this.city.setValue(data.selectedItem);
        this.tax.reset();
        this.reference.reset();
        this.biller.reset();
        this._loadTaxes();
      });
  }

  private _loadTaxes(): void {
    this.paymentsFacade.resetTaxesAgreements();
    this.paymentsFacade.fetchTaxesAgreements(
      taxesAgreementsServiceMapper(this.city.value.id)
    );
  }

  private _redirectStep(): void {
    const toWho: ISaveDataTemplate = {
      ...this.saveDataTemplateService.dataTemplate,
      stepActive: PropertyTemplate.confirmation,
      toWho: {
        ...this.formToWhoPayment.value
      }
    };
    this.saveDataTemplateService.saveDataTemplate(toWho);
    this.saveDataTemplateService.saveDataTemplate({
      ...toWho,
      confirmation: taxesPaymentConfirmationMapper.bind(this)(
        this.saveDataTemplateService.dataTemplate
      )
    });
    this.configTemplate.changeStep(this.configTemplate.config.router[1]);
  }
}
