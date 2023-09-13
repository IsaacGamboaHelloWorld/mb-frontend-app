import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { NewTaxCertificatesPage } from './new-tax-certificates.page';
import { TestingModule } from '@test-helpers/testing.module';
import { MainContainerFacade } from '@modules/main-container/main-container.facade';
import { MainContainerFacadeMock } from '@test-helpers/mocks/facade/main-container.facade.mock';
import { TaxCertificatesFacade } from '@modules/documents/tax-certificates/tax-certificates.facade';
import { TaxCertificatesFacadeMock } from '@test-helpers/mocks/facade/tax-certificates.facade.mock';

describe('NewTaxCertificatesPage', () => {
  let component: NewTaxCertificatesPage;
  let fixture: ComponentFixture<NewTaxCertificatesPage>;
  let serviceNavController: NavController;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [NewTaxCertificatesPage],
        imports: [IonicModule, TestingModule],
        providers: [
          NavController,
          {
            provide: TaxCertificatesFacade,
            useClass: TaxCertificatesFacadeMock
          },
          {
            provide: MainContainerFacade,
            useClass: MainContainerFacadeMock
          }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(NewTaxCertificatesPage);
      component = fixture.componentInstance;
      fixture.detectChanges();

      serviceNavController = fixture.debugElement.injector.get(NavController);
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return true, isWithholdingTaxes()', () => {
    component.formNewTaxCertificates.setValue({
      typeCertificate: 1,
      year: '2022'
    });
    expect(component.isWithholdingTaxes).toEqual(true);
  });

  it('should return true, isGMF()', () => {
    component.formNewTaxCertificates.setValue({
      typeCertificate: 2,
      year: '2022'
    });
    expect(component.isGMF).toEqual(true);
  });

  it('should return true, isIncomeDeclarationTC()', () => {
    component.formNewTaxCertificates.setValue({
      typeCertificate: 3,
      year: '2022'
    });
    expect(component.isIncomeDeclarationTC).toEqual(true);
  });

  it('should return true, isWithholdingTaxesOrGMF(), value 1', () => {
    component.formNewTaxCertificates.setValue({
      typeCertificate: 1,
      year: '2022'
    });
    expect(component.isWithholdingTaxesOrGMF).toEqual(true);
  });

  it('should return true, isWithholdingTaxesOrGMF(), value 2', () => {
    component.formNewTaxCertificates.setValue({
      typeCertificate: 2,
      year: '2022'
    });
    expect(component.isWithholdingTaxesOrGMF).toEqual(true);
  });

  it('should return true, isWithholdingTaxesOrGMF(), value 4', () => {
    component.formNewTaxCertificates.setValue({
      typeCertificate: 4,
      year: '2022'
    });
    expect(component.isWithholdingTaxesOrGMF).toEqual(true);
  });

  it('should get year', () => {
    component['_lastYears'] = ['2021', '2022'];
    expect(component.yearsList[0]).toEqual('2021');
  });

  it('should call taxCertificatesFacade.fetchCertificateGMF', () => {
    component.formNewTaxCertificates.setValue({
      typeCertificate: 2,
      year: '2022'
    });
    spyOn(component['taxCertificatesFacade'], 'fetchCertificateGMF');
    component.formSubmit();
    expect(
      component['taxCertificatesFacade'].fetchCertificateGMF
    ).toHaveBeenCalled();
  });

  it('should call taxCertificatesFacade.fetchCertificateTc', () => {
    component.formNewTaxCertificates.setValue({
      typeCertificate: 3,
      year: '2022'
    });
    spyOn(component['taxCertificatesFacade'], 'fetchCertificateTc');
    component.formSubmit();
    expect(
      component['taxCertificatesFacade'].fetchCertificateTc
    ).toHaveBeenCalled();
  });

  it('should call taxCertificatesFacade.fetchCertificateIncomeTaxes', () => {
    component.formNewTaxCertificates.setValue({
      typeCertificate: 1,
      year: '2022'
    });
    spyOn(component['taxCertificatesFacade'], 'fetchCertificateIncomeTaxes');
    component.formSubmit();
    expect(
      component['taxCertificatesFacade'].fetchCertificateIncomeTaxes
    ).toHaveBeenCalled();
  });

  it('should call taxCertificatesFacade.fetchCertificateRAC', () => {
    component.formNewTaxCertificates.setValue({
      typeCertificate: 4,
      year: '2022'
    });
    spyOn(component['taxCertificatesFacade'], 'fetchCertificateRAC');
    component.formSubmit();
    expect(
      component['taxCertificatesFacade'].fetchCertificateRAC
    ).toHaveBeenCalled();
  });

  it('should call navigateToHome when icon is clicked', () => {
    const btn = fixture.debugElement.nativeElement.querySelector(
      'i.icon-vel-arrows-diagrams-left-2'
    );
    spyOn(component, 'goHome').and.callThrough();
    spyOn(serviceNavController, 'navigateForward');
    btn.click();
    expect(component.goHome).toHaveBeenCalled();
    expect(serviceNavController.navigateForward).toHaveBeenCalled();
  });
});
