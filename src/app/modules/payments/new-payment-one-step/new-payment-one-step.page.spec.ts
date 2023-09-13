import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { NewPaymentOneStepPage } from './new-payment-one-step.page';
import { TestingModule } from '@test-helpers/testing.module';
import { PaymentsFacade } from '@modules/payments/payments.facade';
import { PaymentFacadeMock } from '@test-helpers/mocks/facade/payment.facade.mock';
import { ITaxesPaymentState } from '@modules/payments/store/payments.state';
import { SaveDataTemplateService } from '@commons/velocity/templates/utils/services/save-data-template.service';

describe('NewPaymentOneStepPage', () => {
  let component: NewPaymentOneStepPage;
  let fixture: ComponentFixture<NewPaymentOneStepPage>;
  let facadeService: PaymentsFacade;
  let saveService: SaveDataTemplateService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [NewPaymentOneStepPage],
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

      fixture = TestBed.createComponent(NewPaymentOneStepPage);
      component = fixture.componentInstance;
      facadeService = fixture.debugElement.injector.get(PaymentsFacade);
      saveService = fixture.debugElement.injector.get(SaveDataTemplateService);
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('ionViewDidLeave works correctly', () => {
    const spyResetTaxesCities = spyOn(
      facadeService,
      'resetTaxesCities'
    ).and.callFake(() => null);
    const spyResetTaxesAmountReference = spyOn(
      facadeService,
      'resetTaxesAmountReference'
    ).and.callFake(() => null);
    const spyResetTaxesAgreements = spyOn(
      facadeService,
      'resetTaxesAgreements'
    ).and.callFake(() => null);
    const spyResetTaxesPayment = spyOn(
      facadeService,
      'resetTaxesPayment'
    ).and.callFake(() => null);
    const spyResetPilaAgreements = spyOn(
      facadeService,
      'resetPilaAgreements'
    ).and.callFake(() => null);
    const spyResetPilaInformation = spyOn(
      facadeService,
      'resetPilaInformation'
    ).and.callFake(() => null);
    const spyResetPilaPayment = spyOn(
      facadeService,
      'resetPilaPayment'
    ).and.callFake(() => null);
    const spyResetDetailBiller = spyOn(
      facadeService,
      'resetDetailBiller'
    ).and.callFake(() => null);
    const spyResetBarcodeBiller = spyOn(
      facadeService,
      'resetBarcodeBiller'
    ).and.callFake(() => null);

    component.ionViewDidLeave();
    component.ionViewWillEnter();

    expect(spyResetTaxesCities).toHaveBeenCalled();
    expect(spyResetTaxesAmountReference).toHaveBeenCalled();
    expect(spyResetTaxesAgreements).toHaveBeenCalled();
    expect(spyResetPilaAgreements).toHaveBeenCalled();
    expect(spyResetTaxesPayment).toHaveBeenCalled();
    expect(spyResetPilaInformation).toHaveBeenCalled();
    expect(spyResetPilaPayment).toHaveBeenCalled();
    expect(spyResetDetailBiller).toHaveBeenCalled();
    expect(spyResetBarcodeBiller).toHaveBeenCalled();
  });
  it('_resetMethods should work correctly ', () => {
    const spy = spyOn(saveService, 'saveDataTemplate').and.callFake(() => null);

    const payment: ITaxesPaymentState = {
      response: null,
      loading: false,
      completed: false,
      error: true,
      errorMessage: ''
    };
    const confirmationMapper: any = () => '';
    const successMapper: any = null;
    component['_resetMethods'](payment, confirmationMapper, successMapper);
    expect(spy).toHaveBeenCalled();
  });

  it('_resetMethods should work correctly with paymont in true ', () => {
    const spy = spyOn(saveService, 'saveDataTemplate').and.callFake(() => null);

    const payment: ITaxesPaymentState = {
      response: null,
      loading: false,
      completed: true,
      error: true,
      errorMessage: ''
    };
    const confirmationMapper: any = () => '';
    const successMapper: any = () => '';
    component['_resetMethods'](payment, confirmationMapper, successMapper);
    expect(spy).toHaveBeenCalled();
  });
});
