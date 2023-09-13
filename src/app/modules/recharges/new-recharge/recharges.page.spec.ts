import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

import { RechargesPage } from '@modules/recharges/new-recharge/recharges.page';
import { RechargesFacade } from '@modules/recharges/new-recharge/recharges.facade';
import { RechargesFacadeMock } from '@test-helpers/mocks/facade/recharges.facade.mock';
import { TestingModule } from '@test-helpers/testing.module';
import { SaveDataTemplateService } from '@commons/velocity/templates/utils/services/save-data-template.service';

const confirmation = {
  amount: {
    normalize: 10,
    value: '$1000'
  },
  to: null,
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

describe('RechargesPage', () => {
  let component: RechargesPage;
  let fixture: ComponentFixture<RechargesPage>;
  let injectedServiceTemplate: SaveDataTemplateService;
  let injectedRechargesFacade: RechargesFacade;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [RechargesPage],
        imports: [IonicModule, TestingModule],
        providers: [
          SaveDataTemplateService,
          {
            provide: RechargesFacade,
            useClass: RechargesFacadeMock
          }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(RechargesPage);
      injectedServiceTemplate = TestBed.inject(SaveDataTemplateService);
      injectedRechargesFacade = TestBed.inject(RechargesFacade);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate error recharge', () => {
    injectedServiceTemplate.saveDataTemplate({
      ...injectedServiceTemplate.dataTemplate,
      toWho: confirmation
    });
    component.ionViewWillEnter();
    injectedServiceTemplate.setActionConfirm(true);
    expect(component.ionContent).toBeTruthy();
    component.ionViewDidLeave();
  });

  it('should validate complete recharge', () => {
    injectedRechargesFacade.recharge$ = new BehaviorSubject({
      form: {
        approvalId: '0',
        success: true,
        errorMessage: '',
        rechargeInfo: {
          accountId: '1234567890',
          accountType: '2345',
          phoneNumber: '3016581674',
          amount: '23345',
          operatorName: 'Claro',
          currencyCode: '456',
          companyId: '456',
          id: '1234',
          idType: '3456',
          ipAddress: '12345'
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
