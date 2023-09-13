import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { FormControl, FormGroup } from '@angular/forms';

import { ToWhoNotRegisteredComponent } from './to-who-not-registered.component';
import { TestingModule } from '@test-helpers/testing.module';
import { PaymentsFacade } from '@modules/payments/payments.facade';
import { PaymentFacadeMock } from '@test-helpers/mocks/facade/payment.facade.mock';
import { ModalService } from '@commons/services/modal.service';
import { SaveDataTemplateService } from '@commons/velocity/templates/utils/services/save-data-template.service';
import { ConfigTemplateService } from '@commons/velocity/templates/utils/services/config-template.service';
import { CapacitorElementsMock } from '@test-helpers/mocks/facade/capacitor-elements.mock';

describe('ToWhoNotRegisteredComponent', () => {
  let component: ToWhoNotRegisteredComponent;
  let fixture: ComponentFixture<ToWhoNotRegisteredComponent>;
  let barcodeScannerService: BarcodeScanner;
  let facadeService: PaymentsFacade;
  let modalService: ModalService;
  let saveDataTemplateService: SaveDataTemplateService;
  let configTemplateService: ConfigTemplateService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ToWhoNotRegisteredComponent],
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

      fixture = TestBed.createComponent(ToWhoNotRegisteredComponent);
      component = fixture.componentInstance;
      barcodeScannerService = fixture.debugElement.injector.get(BarcodeScanner);
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

  it('biller return a AbstractControl', () => {
    component.ngOnInit();
    expect(component.biller).toBeDefined();
  });
  it('openBarcode works correctrly', () => {
    spyOn(modalService, 'openModal');
    component.openBarcode();
    expect(modalService.openModal).toHaveBeenCalled();
  });
  it('openFinder works correctly', () => {
    const spy = spyOn(modalService, 'openModal').and.callFake(() => null);
    component.openFinder();
    expect(spy).toHaveBeenCalled();
  });
  it('submitForm works correctly', () => {
    const spy = spyOn(facadeService, 'fetchDetailBiller').and.callFake(
      () => null
    );
    component.formToWhoPayment = new FormGroup({
      from: new FormControl(''),
      to: new FormControl(''),
      biller: new FormControl(''),
      company: new FormControl(''),
      reference: new FormControl('')
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

  it('should call modalService.openModal since error', async () => {
    spyOn<any>(component['modalService'], 'openModal');
    component.openBarcode();
    expect(await component['modalService'].openModal).toHaveBeenCalled();
  });

  it('should call _redirectStep', () => {
    component.formToWhoPayment.setValue({
      from: {
        nameAccount: '',
        id: '123456789',
        productAccountBalances: {
          saldo_disponible: {
            amount: 1234
          }
        }
      },
      company: 'companyMock',
      reference: 'referenceMock',
      biller: 'billermock'
    });
    spyOn<any>(component, '_redirectStep');
    component.submitForm();
    expect(component['_redirectStep']).toHaveBeenCalled();
  });
  it('should call paymentsFacade.fetchDetailBiller', () => {
    component.formToWhoPayment.setValue({
      from: {
        nameAccount: '',
        id: '123456789',
        productAccountBalances: {
          saldo_disponible: {
            amount: 1234
          }
        }
      },
      company: 'companyMock',
      reference: 'referenceMock',
      biller: ''
    });
    spyOn<any>(component['paymentsFacade'], 'fetchDetailBiller');
    component.submitForm();
    expect(component['paymentsFacade'].fetchDetailBiller).toHaveBeenCalled();
  });
});
