import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { CertificatesProductDetailPage } from './certificates-product-detail.page';
import { CertificatesFacade } from '@modules/documents/certificates/certificates.facade';
import { CertificatesFacadeMock } from '@test-helpers/mocks/facade/certificates.facade.mock';
import { MainContainerFacade } from '@modules/main-container/main-container.facade';
import { MainContainerFacadeMock } from '@test-helpers/mocks/facade/main-container.facade.mock';
import { SecurityService } from '@commons/security/services/security.service';
import { Security } from '@commons/security/utils/security';
import { TestingModule } from '@test-helpers/testing.module';

describe('CertificatesProductDetailPage', () => {
  let component: CertificatesProductDetailPage;
  let fixture: ComponentFixture<CertificatesProductDetailPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CertificatesProductDetailPage],
        imports: [IonicModule, TestingModule],
        providers: [
          SecurityService,
          Security,
          {
            provide: CertificatesFacade,
            useClass: CertificatesFacadeMock
          },
          {
            provide: MainContainerFacade,
            useClass: MainContainerFacadeMock
          }
        ],
        schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(CertificatesProductDetailPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    component.loadCertificate();
    expect(component).toBeTruthy();
  });
});
