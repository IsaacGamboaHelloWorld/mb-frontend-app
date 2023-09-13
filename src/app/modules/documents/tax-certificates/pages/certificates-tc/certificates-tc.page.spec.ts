import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CertificatesTcPage } from './certificates-tc.page';
import { TaxCertificatesFacade } from '@modules/documents/tax-certificates/tax-certificates.facade';
import { TaxCertificatesFacadeMock } from '@test-helpers/mocks/facade/tax-certificates.facade.mock';
import { TestingModule } from '@test-helpers/testing.module';
import { MainContainerFacade } from '@modules/main-container/main-container.facade';
import { MainContainerFacadeMock } from '@test-helpers/mocks/facade/main-container.facade.mock';

describe('CertificatesTcPage', () => {
  let component: CertificatesTcPage;
  let fixture: ComponentFixture<CertificatesTcPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CertificatesTcPage],
        imports: [IonicModule, TestingModule],
        providers: [
          {
            provide: TaxCertificatesFacade,
            useClass: TaxCertificatesFacadeMock
          },
          {
            provide: MainContainerFacade,
            useClass: MainContainerFacadeMock
          }
        ]
      }).compileComponents();

      fixture = TestBed.createComponent(CertificatesTcPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
