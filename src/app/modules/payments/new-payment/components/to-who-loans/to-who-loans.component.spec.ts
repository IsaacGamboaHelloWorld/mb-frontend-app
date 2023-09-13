import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ToWhoLoansComponent } from './to-who-loans.component';
import { TestingModule } from '@test-helpers/testing.module';
import { PaymentsFacade } from '@modules/payments/payments.facade';
import { PaymentFacadeMock } from '@test-helpers/mocks/facade/payment.facade.mock';
import { IRegisteredLoan } from '@modules/payments/entities/loans.entities';
import { TypeCreditCardPipe } from '@commons/pipes/type-credit-card.pipe';
import { SaveDataTemplateService } from '@commons/velocity/templates/utils/services/save-data-template.service';
import { ConfigTemplateService } from '@commons/velocity/templates/utils/services/config-template.service';

describe('ToWhoLoansComponent', () => {
  let component: ToWhoLoansComponent;
  let fixture: ComponentFixture<ToWhoLoansComponent>;
  let service: ConfigTemplateService;
  let saveDataService: SaveDataTemplateService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ToWhoLoansComponent],
        imports: [IonicModule, TestingModule],
        providers: [
          TypeCreditCardPipe,
          ConfigTemplateService,
          SaveDataTemplateService,
          {
            provide: PaymentsFacade,
            useClass: PaymentFacadeMock
          }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(ToWhoLoansComponent);
      component = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ConfigTemplateService);
      saveDataService = fixture.debugElement.injector.get(
        SaveDataTemplateService
      );
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('isTC return a true value', () => {
    const isTC = component.isTC('CREDIT_CARD');
    expect(isTC).toBeInstanceOf(Boolean);
    expect(isTC).toBe(true);
    expect(isTC).not.toBeNaN();
  });
  it('isTC return a false value', () => {
    const isTC = component.isTC('testFalse');
    expect(isTC).toBeInstanceOf(Boolean);
    expect(isTC).toBe(false);
    expect(isTC).not.toBeNaN();
  });

  it('trackByTo return a string', () => {
    const loan: IRegisteredLoan = {
      accountId: 'bank',
      accountType: '',
      bank: 'test',
      bankName: '',
      loanName: '',
      paymentInformation: '',
      paymentId: ''
    };
    const trackBy = component.trackByTo(0, loan);
    expect(trackBy).toBeInstanceOf(String);
    expect(trackBy).toBe('test');
    expect(trackBy).not.toBeNaN();
  });
  it('setIcon return a string', () => {
    const icon = component.setIcon('1');
    expect(icon).toBeNull();
  });
  it('submitForm works correctly', () => {
    const spy = spyOn(service, 'changeStep').and.callFake(() => null);
    const fb = new FormBuilder();
    const testForm = fb.group({
      from: [],
      to: []
    });
    component.formToWhoPayment = testForm;
    component.submitForm();
    expect(spy).toHaveBeenCalled();
  });
  it('submitForm works correctly when it isnt valid', () => {
    const spy = spyOn(service, 'changeStep').and.callFake(() => null);
    component['initForm']();
    component.submitForm();
    expect(spy).not.toHaveBeenCalled();
  });
});
