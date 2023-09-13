import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { HowMuchLoanComponent } from './how-much-loan.component';
import { TestingModule } from '@test-helpers/testing.module';
import { PaymentsFacade } from '@modules/payments/payments.facade';
import { PaymentFacadeMock } from '@test-helpers/mocks/facade/payment.facade.mock';
import { IConfigTemplate } from '@commons/velocity/templates/utils/entities/config.entities';

describe('HowMuchLoanComponent', () => {
  let component: HowMuchLoanComponent;
  let fixture: ComponentFixture<HowMuchLoanComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [HowMuchLoanComponent],
        imports: [IonicModule, TestingModule],
        providers: [
          {
            provide: PaymentsFacade,
            useClass: PaymentFacadeMock
          }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(HowMuchLoanComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      component.formHowMuchLoan.setValue({
        amount: '10000',
        type: 'typeMock',
        otherAmount: 'otherAmountMock'
      });
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be equal to typeMock', () => {
    expect(component.type.value).toEqual('typeMock');
  });

  it('should return types', () => {
    const types = {
      OTHER: 'other',
      TOTAL: 'total',
      MIN: 'min'
    };
    expect(component.types).toEqual(types);
  });

  it('should be equal to typeMock', () => {
    expect(component.otherAmount.value).toEqual('otherAmountMock');
  });

  it('should change showInput', () => {
    component.changeOtherValue(true);
    expect(component.showInput).toBeTrue();
  });

  it('shoul call saveDataTemplateService.saveDataTemplate', () => {
    spyOn<any>(component['saveDataTemplateService'], 'saveDataTemplate');
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
        },
        {
          url: '',
          step: 3
        }
      ],
      ionContent: null
    };
    component['configTemplate'].setConfig(config);
    component.submitForm();
    expect(
      component['saveDataTemplateService'].saveDataTemplate
    ).toHaveBeenCalled();
  });
});
