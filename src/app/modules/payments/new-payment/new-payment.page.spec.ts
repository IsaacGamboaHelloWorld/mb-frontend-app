import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { NewPaymentPage } from 'src/app/modules/payments/new-payment/new-payment.page';
import { TestingModule } from '@test-helpers/testing.module';
import { PaymentsFacade } from '@modules/payments/payments.facade';
import { PaymentFacadeMock } from '@test-helpers/mocks/facade/payment.facade.mock';
import { ILoanPayment } from '@modules/payments/entities/loans.entities';
import { ILoanPaymentState } from '@modules/payments/store/payments.state';
import { SaveDataTemplateService } from '@commons/velocity/templates/utils/services/save-data-template.service';

describe('NewPaymentPage', () => {
  let component: NewPaymentPage;
  let fixture: ComponentFixture<NewPaymentPage>;
  let facadeService: PaymentsFacade;
  let saveDataService: SaveDataTemplateService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [NewPaymentPage],
        imports: [IonicModule, TestingModule],
        providers: [
          SaveDataTemplateService,
          {
            provide: PaymentsFacade,
            useClass: PaymentFacadeMock
          }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(NewPaymentPage);
      component = fixture.componentInstance;
      facadeService = fixture.debugElement.injector.get(PaymentsFacade);
      saveDataService = fixture.debugElement.injector.get(
        SaveDataTemplateService
      );
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ionViewDidLeave works correctly', () => {
    const spyResetNewPaymentBiller = spyOn(
      facadeService,
      'resetNewPaymentBiller'
    ).and.callFake(() => null);
    const spyResetNewPaymentLoan = spyOn(
      facadeService,
      'resetNewPaymentLoan'
    ).and.callFake(() => null);
    const spyResetSearchBiller = spyOn(
      facadeService,
      'resetSearchBiller'
    ).and.callFake(() => null);
    const spyResetDetailBiller = spyOn(
      facadeService,
      'resetDetailBiller'
    ).and.callFake(() => null);
    const spyResetCreditCard = spyOn(
      facadeService,
      'resetCreditCard'
    ).and.callFake(() => null);

    component.ionViewDidLeave();
    component.ionViewWillEnter();

    expect(spyResetNewPaymentBiller).toHaveBeenCalled();
    expect(spyResetNewPaymentLoan).toHaveBeenCalled();
    expect(spyResetSearchBiller).toHaveBeenCalled();
    expect(spyResetDetailBiller).toHaveBeenCalled();
    expect(spyResetCreditCard).toHaveBeenCalled();
  });

  it('resetMethods works correctly', () => {
    const paymont: ILoanPaymentState = {
      information: null,
      loading: true,
      completed: true,
      error: false,
      errorMessage: ''
    };
    const confirmationMapper = () => {};
    const successMapper = () => {};
    const spy = spyOn(saveDataService, 'saveDataTemplate').and.callFake(
      () => null
    );
    component['resetMethods'](paymont, confirmationMapper, successMapper);
    expect(spy).toHaveBeenCalled();
  });
  it('resetMethods works correctly with payment.error', () => {
    const paymont: ILoanPaymentState = {
      information: null,
      loading: true,
      completed: false,
      error: true,
      errorMessage: ''
    };
    const confirmationMapper = () => {};
    const successMapper = () => {};
    const spy = spyOn(saveDataService, 'setUpdateComponent').and.callFake(
      () => null
    );
    component['resetMethods'](paymont, confirmationMapper, successMapper);
    expect(spy).toHaveBeenCalled();
  });
});
