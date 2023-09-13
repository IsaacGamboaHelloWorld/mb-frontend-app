import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

import { AdvancesPage } from './advances.page';
import { TestingModule } from '@test-helpers/testing.module';
import { AdvancesFacadeMock } from '@test-helpers/mocks/facade/advances.facade.mock';
import { SaveDataTemplateService } from '@commons/velocity/templates/utils/services/save-data-template.service';
import { AdvancesFacade } from '@modules/detail/advances/new-advance/advances.facade';

const confirmation = {
  amount: {
    normalize: 10,
    value: '$1000'
  },
  transferToggle: true,
  phoneNumber: {
    value: '301 6581674',
    normalize: 3016581674
  },
  toWho: {
    nameAccount: '',
    id: '123456789',
    productAccountBalances: {
      saldo_disponible: {
        amount: 1234
      }
    },
    description: ''
  },
  to: {
    nameAccount: '',
    id: '123456789',
    productAccountBalances: {
      saldo_disponible: {
        amount: 1234
      }
    }
  }
};

describe('AdvancesPage', () => {
  let component: AdvancesPage;
  let fixture: ComponentFixture<AdvancesPage>;
  let injectedServiceTemplate: SaveDataTemplateService;
  let injectedAdvancesFacade: AdvancesFacade;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AdvancesPage],
        imports: [IonicModule, TestingModule],
        providers: [
          SaveDataTemplateService,
          {
            provide: AdvancesFacade,
            useClass: AdvancesFacadeMock
          }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(AdvancesPage);
      injectedServiceTemplate = TestBed.inject(SaveDataTemplateService);
      injectedAdvancesFacade = TestBed.inject(AdvancesFacade);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate error advance$', () => {
    injectedServiceTemplate.saveDataTemplate({
      ...injectedServiceTemplate.dataTemplate,
      toWho: confirmation
    });
    component.ionViewWillEnter();
    injectedServiceTemplate.setActionConfirm(true);
    expect(component.ionContent).toBeTruthy();
    component.ionViewDidLeave();
  });

  it('should validate complete advance$', () => {
    injectedAdvancesFacade.advance$ = new BehaviorSubject({
      response: {
        approvalId: '',
        success: true,
        errorMessage: '',
        details: {
          companyId: '',
          accountFromInformation: {
            accountIdentifier: '123445678',
            productType: '',
            bank: '',
            expirationMonth: '',
            expirationYear: ''
          },
          accountToInformation: {
            accountIdentifier: '123445678',
            productType: '',
            bank: '',
            expirationMonth: '',
            expirationYear: ''
          },
          advanceInformation: {
            amount: 1234,
            currencyCode: '',
            description: '',
            numberFees: 123,
            transactionCost: 123,
            transactionDate: ''
          }
        }
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
