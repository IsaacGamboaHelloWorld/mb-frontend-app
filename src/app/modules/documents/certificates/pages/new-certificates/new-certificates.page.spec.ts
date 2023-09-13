import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { NewCertificatesPage } from './new-certificates.page';
import { TestingModule } from '@test-helpers/testing.module';
import { MainContainerFacade } from '@modules/main-container/main-container.facade';
import { MainContainerFacadeMock } from '@test-helpers/mocks/facade/main-container.facade.mock';
import { CertificatesFacade } from '@modules/documents/certificates/certificates.facade';
import { CertificatesFacadeMock } from '@test-helpers/mocks/facade/certificates.facade.mock';
import { Product } from '@commons/models/product.model';

describe('NewCertificatesPage', () => {
  let component: NewCertificatesPage;
  let fixture: ComponentFixture<NewCertificatesPage>;
  let serviceCertificadeFacade: CertificatesFacade;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [NewCertificatesPage],
        imports: [IonicModule, TestingModule],
        providers: [
          {
            provide: CertificatesFacade,
            useClass: CertificatesFacadeMock
          },
          {
            provide: MainContainerFacade,
            useClass: MainContainerFacadeMock
          }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(NewCertificatesPage);
      component = fixture.componentInstance;
      serviceCertificadeFacade = fixture.debugElement.injector.get(
        CertificatesFacade
      );
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('ionViewDidLeave works correctly', () => {
    const spyFacade = spyOn(
      serviceCertificadeFacade,
      'resetCertificate'
    ).and.callFake(() => null);
    component.ionViewDidLeave();
    expect(spyFacade).toHaveBeenCalled();
  });

  it('formSubmit works correctly', () => {
    const spyFacade = spyOn(
      serviceCertificadeFacade,
      'fetchCertificate'
    ).and.callFake(() => null);
    component.formSubmit();
    expect(spyFacade).toHaveBeenCalled();
  });
  it('mapper should return correctly when is DEPOSIT_ACCOUNT', () => {
    const productTest: Product = {
      accountInformation: {
        productName: 'productNameTest',
        accountIdentifier: 'accountIdentifierTest',
        productType: 'productTypeTest'
      },
      typeAccount: 'DEPOSIT_ACCOUNT'
    };
    const returnMapperTest = {
      productName: 'productNameTest',
      accountIdentifier: 'Test',
      availableBalanceLabel: 'BALANCE_AVAILABLE',
      availableBalance: undefined,
      icon: 'icon-vel-money-box-b'
    };
    const functionTest = component.infoProductCardSmall(productTest);
    expect(functionTest).not.toBeNull();
    expect(functionTest).toEqual(returnMapperTest);
  });

  it('mapper should return correctly when is CURRENT_ACCOUNT', () => {
    const productTest: Product = {
      accountInformation: {
        productName: 'productNameTest',
        accountIdentifier: 'accountIdentifierTest',
        productType: 'productTypeTest'
      },
      typeAccount: 'CURRENT_ACCOUNT'
    };
    const returnMapperTest = {
      productName: 'productNameTest',
      accountIdentifier: 'Test',
      availableBalanceLabel: 'BALANCE_AVAILABLE',
      availableBalance: undefined,
      icon: 'icon-vel-money-box'
    };
    const functionTest = component.infoProductCardSmall(productTest);
    expect(functionTest).not.toBeNull();
    expect(functionTest).toEqual(returnMapperTest);
  });

  it('mapper should return correctly when is CREDIT_CARD', () => {
    const productTest: Product = {
      accountInformation: {
        productName: 'productNameTest',
        accountIdentifier: 'accountIdentifierTest',
        productType: 'productTypeTest'
      },
      typeAccount: 'CREDIT_CARD'
    };
    const returnMapperTest = {
      productName: 'productNameTest',
      accountIdentifier: 'Test',
      availableBalanceLabel: 'PRODUCTS.CREDIT_CARD.QUOTA_AVAILABLE',
      availableBalance: undefined,
      img: null
    };
    const functionTest = component.infoProductCardSmall(productTest);
    expect(functionTest).not.toBeNull();
    expect(functionTest).toEqual(returnMapperTest);
  });
});
