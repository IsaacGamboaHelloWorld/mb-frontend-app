import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

import { NewTransferPage } from '@modules/transfer/new-transfer/new-transfer.page';
import { TestingModule } from '@test-helpers/testing.module';
import { NewTransferFacade } from '@modules/transfer/transfer.facade';
import { NewTransferFacadeMock } from '@test-helpers/mocks/facade/new-transfer.facade.mock';
import { SaveDataTemplateService } from '@commons/velocity/templates/utils/services/save-data-template.service';
import { ConfigTemplateService } from '@commons/velocity/templates/utils/services/config-template.service';
import { NEW_TRANSFER } from '@commons/constants/navigatie-global';

const confirmationNotRegister = {
  howMuch: {
    voucherId: '',
    amount: {
      normalize: 10,
      value: '$1000'
    },
    description: ''
  },
  when: {
    date: ''
  },
  toWho: {
    from: {
      nameAccount: '',
      id: '123456789',
      numberAccount: '123456789',
      typeAccount: '',
      productAccountBalances: {
        saldo_disponible: {
          amount: 1234
        }
      }
    }
  }
};

const confirmation = {
  howMuch: {
    voucherId: '',
    amount: {
      normal: 10,
      value: '$1000'
    },
    description: ''
  },
  when: {
    date: ''
  },
  to: {
    customerName: '',
    destinationAccountId: '123456789',
    destinationAccountType: ''
  },
  toWho: {
    constTransaction: '',
    numberAccount: '123456',
    from: {
      nameAccount: '',
      id: '123456789',
      numberAccount: '123456789',
      typeAccount: '',
      productAccountBalances: {
        saldo_disponible: {
          amount: 1234
        }
      }
    }
  }
};

describe('TransferComponent', () => {
  let component: NewTransferPage;
  let fixture: ComponentFixture<NewTransferPage>;
  let injectedServiceTemplate: SaveDataTemplateService;
  let injectedNewTransferFacade: NewTransferFacade;
  let injectedConfigTemplateService: ConfigTemplateService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [NewTransferPage],
        imports: [IonicModule, TestingModule],
        providers: [
          SaveDataTemplateService,
          {
            provide: NewTransferFacade,
            useClass: NewTransferFacadeMock
          }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(NewTransferPage);
      injectedServiceTemplate = TestBed.inject(SaveDataTemplateService);
      injectedNewTransferFacade = TestBed.inject(NewTransferFacade);
      injectedConfigTemplateService = TestBed.inject(ConfigTemplateService);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate error newTransfer$ not register', () => {
    injectedServiceTemplate.saveDataTemplate({
      ...injectedServiceTemplate.dataTemplate,
      toWho: confirmationNotRegister
    });
    component.ionViewWillEnter();
    injectedServiceTemplate.setActionConfirm(true);
    expect(component.ionContent).toBeTruthy();
    component.ionViewDidLeave();
  });

  it('should validate error newTransfer$ register', () => {
    injectedServiceTemplate.saveDataTemplate({
      ...injectedServiceTemplate.dataTemplate,
      toWho: confirmation
    });
    injectedConfigTemplateService.setConfig({
      ...injectedConfigTemplateService.config,
      defaultUrl: NEW_TRANSFER
    });
    component.ionViewWillEnter();
    injectedServiceTemplate.setActionConfirm(true);
    expect(component.ionContent).toBeTruthy();
    component.ionViewDidLeave();
  });

  it('should validate complete newTransfer$', () => {
    injectedNewTransferFacade.newTransfer$ = new BehaviorSubject({
      information: {
        errorStatusCode: '',
        approvalId: '',
        errorMessage: '',
        specificErrorMessage: '',
        request: {
          transactionCost: '',
          companyId: '',
          id: '',
          idType: '',
          ipAddress: '',
          currentSystemDate: 1234,
          notes: '',
          dueDate: '',
          accountFromInformation: {
            accountIdentifier: '',
            productType: '',
            bank: '',
            bankName: '',
            name: '',
            identificationType: '',
            identificationNumber: '',
            isFavorite: true
          },
          accountToInformation: {
            accountIdentifier: '',
            productType: '',
            bank: '',
            bankName: '',
            name: '',
            identificationType: '',
            identificationNumber: '',
            isFavorite: true
          },
          transferInformation: {
            amount: 1245
          },
          invoiceNumber: '',
          requestId: '',
          approvedChallenge: true
        },
        success: true
      },
      loading: false,
      errorMessage: '',
      completed: true,
      error: false
    });
    component.ionContent = {
      scrollToTop: () => {}
    } as any;

    component.ionViewWillEnter();
    expect(component.ionContent).toBeTruthy();
  });
});
