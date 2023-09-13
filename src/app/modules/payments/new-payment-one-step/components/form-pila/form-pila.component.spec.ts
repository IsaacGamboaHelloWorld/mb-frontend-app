import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

import { FormPilaComponent } from './form-pila.component';
import { TestingModule } from '@test-helpers/testing.module';
import { PaymentsFacade } from '@modules/payments/payments.facade';
import { PaymentFacadeMock } from '@test-helpers/mocks/facade/payment.facade.mock';
import { SaveDataTemplateService } from '@commons/velocity/templates/utils/services/save-data-template.service';
import { ConfigTemplateService } from '@commons/velocity/templates/utils/services/config-template.service';

describe('FormPilaComponent', () => {
  let component: FormPilaComponent;
  let fixture: ComponentFixture<FormPilaComponent>;
  let facadeService: PaymentsFacade;
  let saveDataTemplateService: SaveDataTemplateService;
  let configTemplateService: ConfigTemplateService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FormPilaComponent],
        imports: [IonicModule, TestingModule],
        providers: [
          {
            provide: PaymentsFacade,
            useClass: PaymentFacadeMock
          }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(FormPilaComponent);
      component = fixture.componentInstance;
      facadeService = fixture.debugElement.injector.get(PaymentsFacade);
      saveDataTemplateService = fixture.debugElement.injector.get(
        SaveDataTemplateService
      );
      configTemplateService = fixture.debugElement.injector.get(
        ConfigTemplateService
      );
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('to return an AbstractControl', () => {
    component.ngOnInit();
    expect(component.to).toBeDefined();
    expect(component.to).toBeInstanceOf(AbstractControl);
  });
  it('payrollNumber return an AbstractControl', () => {
    component.ngOnInit();
    expect(component.payrollNumber).toBeDefined();
    expect(component.payrollNumber).toBeInstanceOf(AbstractControl);
  });
  it('year return an AbstractControl', () => {
    component.ngOnInit();
    expect(component.year).toBeDefined();
    expect(component.year).toBeInstanceOf(AbstractControl);
  });
  it('documentId return an AbstractControl', () => {
    component.ngOnInit();
    expect(component.documentId).toBeDefined();
    expect(component.documentId).toBeInstanceOf(AbstractControl);
  });
  it('month return an AbstractControl', () => {
    component.ngOnInit();
    expect(component.month).toBeDefined();
    expect(component.month).toBeInstanceOf(AbstractControl);
  });
  it('paymentInfo return an AbstractControl', () => {
    component.ngOnInit();
    expect(component.paymentInfo).toBeDefined();
    expect(component.paymentInfo).toBeInstanceOf(AbstractControl);
  });
  it('submitForm works correctly', () => {
    const spy = spyOn(facadeService, 'fetchPilaInformation').and.callFake(
      () => null
    );
    component.formToWhoPayment = new FormGroup({
      from: new FormControl(''),
      to: new FormControl(''),
      biller: new FormControl(''),
      company: new FormControl(''),
      reference: new FormControl(''),
      tax: new FormControl(''),
      isBarcode: new FormControl(''),
      referenceType: new FormControl('1')
    });
    component.formToWhoPayment.get('biller').setValue(null);
    component.submitForm();
    expect(spy).toHaveBeenCalled();
  });
  it('_redirectStep works correctly', () => {
    const spy = spyOn(saveDataTemplateService, 'saveDataTemplate').and.callFake(
      () => null
    );
    const spyTemplate = spyOn(configTemplateService, 'changeStep').and.callFake(
      () => null
    );
    component['_redirectStep']();
    expect(spy).toHaveBeenCalled();
    expect(spyTemplate).toHaveBeenCalled();
  });
});
