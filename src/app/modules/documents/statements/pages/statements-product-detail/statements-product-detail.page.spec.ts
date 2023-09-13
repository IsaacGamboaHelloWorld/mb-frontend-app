import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { StatementsProductDetailPage } from './statements-product-detail.page';
import { StatementsFacade } from '@modules/documents/statements/statements.facade';
import { StatementsFacadeMock } from '@test-helpers/mocks/facade/statements.facade.mock';
import { MainContainerFacade } from '@modules/main-container/main-container.facade';
import { MainContainerFacadeMock } from '@test-helpers/mocks/facade/main-container.facade.mock';
import { TestingModule } from '@test-helpers/testing.module';
import { SecurityService } from '@commons/security/services/security.service';
import { Security } from '@commons/security/utils/security';
import { AdlSecureStorageService } from '@commons/services/adl-security-storage.service';

describe('StatementsProductDetailPage', () => {
  let component: StatementsProductDetailPage;
  let fixture: ComponentFixture<StatementsProductDetailPage>;
  let injectedStorage: AdlSecureStorageService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [StatementsProductDetailPage],
        imports: [IonicModule, TestingModule],
        providers: [
          SecurityService,
          Security,
          {
            provide: StatementsFacade,
            useClass: StatementsFacadeMock
          },
          {
            provide: MainContainerFacade,
            useClass: MainContainerFacadeMock
          }
        ],
        schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(StatementsProductDetailPage);
      injectedStorage = TestBed.inject(AdlSecureStorageService);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate type product', () => {
    component.productBasic = { id: '110080000680', type: 'DEPOSIT_ACCOUNT' };
    component.fetchStatement(true);
    component.formGenerateExtracts.controls['period'].setValue('test');
    component.fetchStatement(false);
    expect(component.isTC).toBeFalsy();
  });
});
