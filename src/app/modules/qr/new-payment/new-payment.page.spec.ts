import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

import { NewPaymentPage } from './new-payment.page';
import { TestingModule } from '@test-helpers/testing.module';
import { QrFacade } from '@modules/qr/new-payment/qr.facade';
import { QrFacadeMock } from '@test-helpers/mocks/facade/qr.facade.mock';
import { AnimationService } from '@modules/qr/new-payment/services/animation.service';
import { SaveDataTemplateService } from '@commons/velocity/templates/utils/services/save-data-template.service';

const confirmation = {
  toWho: {
    qrInfo: {
      transactionAmount: '1000',
      merchantName: '',
      ivaBaseValue: '100',
      incValue: '100',
      tipValue: '100',
      ivaValue: '100',
      trnConsecutiveCode: '1000'
    },
    from: {
      nameAccount: '',
      id: '123456789',
      productAccountBalances: {
        saldo_disponible: {
          amount: 1234
        }
      }
    }
  }
};

describe('NewPaymentPage', () => {
  let component: NewPaymentPage;
  let fixture: ComponentFixture<NewPaymentPage>;
  let injectedServiceTemplate: SaveDataTemplateService;
  let injectedQrFacade: QrFacade;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [NewPaymentPage],
        imports: [IonicModule, TestingModule],
        providers: [
          AnimationService,
          {
            provide: QrFacade,
            useClass: QrFacadeMock
          }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(NewPaymentPage);
      injectedServiceTemplate = TestBed.inject(SaveDataTemplateService);
      injectedQrFacade = TestBed.inject(QrFacade);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate error qrPayment$', () => {
    injectedServiceTemplate.saveDataTemplate({
      ...injectedServiceTemplate.dataTemplate,
      toWho: confirmation
    });
    component.ionViewWillEnter();
    injectedServiceTemplate.setActionConfirm(true);
    expect(component.ionContent).toBeTruthy();
    component.ionViewDidLeave();
  });

  it('should validate complete qrPayment$', () => {
    injectedQrFacade.qrPayment$ = new BehaviorSubject({
      information: {
        transaction: {
          clientDt: '',
          finalPrcDt: '',
          trnRqUID: '',
          trnSrc: ''
        },
        postAddr: {
          city: '',
          stateProv: '',
          country: ''
        },
        numberOfInstalments: '2',
        paymentMethod: {
          id: '123456788',
          accountType: '',
          accountBalance: '',
          accountId: '123456788'
        },
        date: '',
        qrInfo: {
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
          transactionAmount: '',
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
        success: true,
        errorMessage: '',
        specificErrorMessage: '',
        error: false
      },
      loading: false,
      completed: true,
      error: false,
      errorMessage: ''
    });
    component.ionContent = {
      scrollToTop: () => {}
    } as any;

    component.ionViewWillEnter();
    expect(component.ionContent).toBeTruthy();
  });
});
