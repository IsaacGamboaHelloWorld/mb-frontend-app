import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { GestureController, IonicModule } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

import { ToWhoQrComponent } from './to-who-qr.component';
import { QrFacade } from '@modules/qr/new-payment/qr.facade';
import { QrFacadeMock } from '@test-helpers/mocks/facade/qr.facade.mock';
import { TestingModule } from '@test-helpers/testing.module';
import { AnimationService } from '@modules/qr/new-payment/services/animation.service';
import { VelocitySumSubtractModule } from '@commons/velocity/molecules/velocity-sum-subtract/velocity-sum-subtract.module';
import { IQrInfoState } from '@modules/main-container/store/states/main-container.state';
import { IConfigTemplate } from '@commons/velocity/templates/utils/entities/config.entities';

describe('ToWhoQrComponent', () => {
  let component: ToWhoQrComponent;
  let fixture: ComponentFixture<ToWhoQrComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ToWhoQrComponent],
        imports: [IonicModule, TestingModule, VelocitySumSubtractModule],
        providers: [
          AnimationService,
          GestureController,
          {
            provide: QrFacade,
            useClass: QrFacadeMock
          }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(ToWhoQrComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      component.formQr.setValue({
        from: {
          nameAccount: '',
          id: '123456789',
          productAccountBalances: {
            saldo_disponible: {
              amount: 1234
            }
          },
          accountBalance: '20000'
        },
        numberOfInstalments: 37
      });
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be equal to 123456789', () => {
    expect(component.from.value.id).toEqual('123456789');
  });

  it('should be equal to 36', () => {
    component.sum();
    expect(component.formQr.get('numberOfInstalments').value).toEqual(36);
  });

  it('should be equal to 35', () => {
    component.formQr.get('numberOfInstalments').setValue(34);

    component.sum();
    expect(component.formQr.get('numberOfInstalments').value).toEqual(35);
  });

  it('should be equal to 1', () => {
    component.formQr.get('numberOfInstalments').setValue(0);
    component.subtract();
    expect(component.formQr.get('numberOfInstalments').value).toEqual(1);
  });

  it('should be equal to 2', () => {
    component.formQr.get('numberOfInstalments').setValue(3);
    component.subtract();
    expect(component.formQr.get('numberOfInstalments').value).toEqual(2);
  });

  it('should be false', (done: DoneFn) => {
    component.hasInfoQr.subscribe((resp) => {
      expect(resp).toBeFalse();
      done();
    });
  });

  it('should call configTemplate.changeStep and facade.openToast.toHaveBeenCalled', () => {
    const state: IQrInfoState = {
      information: {
        emvIndicator: '',
        qrType: '',
        crc: '',
        securityHashCode: '',
        terminal: '',
        acquirerCode: '',
        merchantCode: '',
        ivaValue: '',
        incValue: '',
        merchantAggregatorCode: '',
        merchantCategoryCode: '',
        countryCode: '',
        merchantName: '',
        merchantCity: '',
        postalCode: '',
        channelCode: '',
        ivaConditionCode: '',
        ivaDomain: '',
        ivaBaseValue: '',
        incConditionCode: '',
        currencyCode: '',
        transactionAmount: '20000',
        trnConsecutiveCode: '',
        tipIndicator: '',
        tipValue: '',
        tipPercentage: '',
        languagePreference: '',
        billingNumber: '',
        mobileNUmber: '',
        storeLabel: '',
        loyaltyNumber: '',
        referenceLabel: '',
        customerLabel: '',
        trxPurpose: '',
        additionalConsumerData: '',
        merchantLanguageName: '',
        merchantLanguageCity: '',
        acquirerDomain: '',
        securityHashDomain: '',
        merchantDomain: '',
        channelDomain: '',
        ivaConditionDomain: '',
        ivaBaseDomain: '',
        incConditionDomain: '',
        trnConsecutiveDomain: '',
        incDomain: ''
      },
      loading: false,
      completed: true,
      error: false,
      errorMessage: 'error'
    };

    const obs: Observable<IQrInfoState> = new BehaviorSubject(state);

    spyOnProperty(component, 'qrInfo$', 'get').and.returnValue(obs);

    const config: IConfigTemplate = {
      beforeUrl: '',
      defaultUrl: '',
      toWho: null,
      router: [
        {
          url: '',
          step: 1
        },
        {
          url: '',
          step: 2
        }
      ],
      ionContent: null
    };
    component['configTemplate'].setConfig(config);

    spyOn<any>(component['configTemplate'], 'changeStep');

    component.submitForm();
    expect(component['configTemplate'].changeStep).toHaveBeenCalled();

    spyOn(component['facade'], 'openToast');
    const data = {
      nameAccount: '',
      id: '123456789',
      productAccountBalances: {
        saldo_disponible: {
          amount: 1234
        }
      },
      accountBalance: '15000'
    };
    component.formQr.get('from').setValue(data);

    component.submitForm();
    expect(component['facade'].openToast).toHaveBeenCalled();
  });

  it('should be false animation.showShadow', (done: DoneFn) => {
    component['_animation']();
    component['animation'].setActionClick();
    component['animation'].showShadow.subscribe((resp) => {
      expect(resp).toBeFalse();
      done();
    });
  });
});
