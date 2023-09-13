import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

import { TransferWithdrawalPage } from './transfer-withdrawal.page';
import { TestingModule } from '@test-helpers/testing.module';
import { TransferWithdrawalFacade } from '@modules/transfer-withdrawal/new-withdrawal/transfer-withdrawal.facade';
import { TransferWithdrawalFacadeMock } from '@test-helpers/mocks/facade/transfer-withdrawal.facade.mock';
import { SaveDataTemplateService } from '@commons/velocity/templates/utils/services/save-data-template.service';

const confirmation = {
  amount: {
    normalize: 10,
    value: '$1000'
  },
  fixedAmount: {
    id: 0
  },
  where: {
    name: 'test'
  },
  transferToggle: true,
  phoneNumber: {
    value: '301 6581674',
    normalize: 3016581674
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
};

describe('TransferWithdrawalPage', () => {
  let component: TransferWithdrawalPage;
  let fixture: ComponentFixture<TransferWithdrawalPage>;
  let injectedServiceFacade: TransferWithdrawalFacade;
  let injectedServiceTemplate: SaveDataTemplateService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TransferWithdrawalPage],
        imports: [IonicModule, TestingModule],
        providers: [
          SaveDataTemplateService,
          {
            provide: TransferWithdrawalFacade,
            useClass: TransferWithdrawalFacadeMock
          }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(TransferWithdrawalPage);
      injectedServiceFacade = TestBed.inject(TransferWithdrawalFacade);
      injectedServiceTemplate = TestBed.inject(SaveDataTemplateService);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate error transferWithdrawal$', () => {
    injectedServiceTemplate.saveDataTemplate({
      ...injectedServiceTemplate.dataTemplate,
      toWho: confirmation
    });
    component.ionViewWillEnter();
    injectedServiceTemplate.setActionConfirm(true);
    expect(component.ionContent).toBeTruthy();
    component.ionViewDidLeave();
  });

  it('should validate complete transferWithdrawal$', () => {
    injectedServiceFacade.transferWithdrawal$ = new BehaviorSubject({
      response: {
        otp: '123456',
        validityTime: '',
        errorMessage: '',
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
