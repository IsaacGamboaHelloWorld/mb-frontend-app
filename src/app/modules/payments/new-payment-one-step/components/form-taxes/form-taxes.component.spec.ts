import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { FormTaxesComponent } from './form-taxes.component';
import { TestingModule } from '@test-helpers/testing.module';
import { PaymentsFacade } from '@modules/payments/payments.facade';
import { PaymentFacadeMock } from '@test-helpers/mocks/facade/payment.facade.mock';
import { ModalService } from '@commons/services/modal.service';
import { SaveDataTemplateService } from '@commons/velocity/templates/utils/services/save-data-template.service';
import { ConfigTemplateService } from '@commons/velocity/templates/utils/services/config-template.service';
import { CapacitorElementsMock } from '@test-helpers/mocks/facade/capacitor-elements.mock';

describe('FormTaxesComponent', () => {
  let component: FormTaxesComponent;
  let fixture: ComponentFixture<FormTaxesComponent>;
  let facadeService: PaymentsFacade;
  let modalService: ModalService;
  let saveDataTemplateService: SaveDataTemplateService;
  let configTemplateService: ConfigTemplateService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FormTaxesComponent],
        imports: [IonicModule, TestingModule],
        providers: [
          ModalService,
          SaveDataTemplateService,
          ConfigTemplateService,
          {
            provide: PaymentsFacade,
            useClass: PaymentFacadeMock
          },
          {
            provide: BarcodeScanner,
            useClass: CapacitorElementsMock
          }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(FormTaxesComponent);
      component = fixture.componentInstance;
      facadeService = fixture.debugElement.injector.get(PaymentsFacade);
      modalService = fixture.debugElement.injector.get(ModalService);
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
  it('reference return an AbstractControl', () => {
    component.ngOnInit();
    expect(component.reference).toBeDefined();
    expect(component.reference).toBeInstanceOf(AbstractControl);
  });
  it('biller return an AbstractControl', () => {
    component.ngOnInit();
    expect(component.biller).toBeDefined();
    expect(component.biller).toBeInstanceOf(AbstractControl);
  });
  it('isBarcode return an AbstractControl', () => {
    component.ngOnInit();
    expect(component.isBarcode).toBeDefined();
    expect(component.isBarcode).toBeInstanceOf(AbstractControl);
  });
  it('taxesByCity$ return an ITaxesAgreementsState', () => {
    component.openBarcode();
    expect(component.taxesByCity$).toBeDefined();
  });
  it('openFinder works correctly', () => {
    const spy = spyOn(modalService, 'openModal').and.callFake(() => null);
    component.openFinder();
    expect(spy).toHaveBeenCalled();
  });
  it('submitForm works correctly', () => {
    const spy = spyOn(facadeService, 'fetchTaxesAmountReference').and.callFake(
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
      city: new FormControl('')
    });
    component.formToWhoPayment.get('biller').setValue(null);
    component.submitForm();
    expect(spy).toHaveBeenCalled();
  });
  it('_loadTaxes works correctly', () => {
    component.formToWhoPayment = new FormGroup({
      city: new FormControl('')
    });
    const spy = spyOn(facadeService, 'resetTaxesAgreements').and.callFake(
      () => null
    );
    const facadeSpy = spyOn(facadeService, 'fetchTaxesAgreements').and.callFake(
      () => null
    );
    component['_loadTaxes']();
    expect(spy).toHaveBeenCalled();
    expect(facadeSpy).toHaveBeenCalled();
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
