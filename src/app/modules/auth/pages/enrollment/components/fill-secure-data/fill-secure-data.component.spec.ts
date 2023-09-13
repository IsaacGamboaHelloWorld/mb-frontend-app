import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { TestingModule } from '@test-helpers/testing.module';
import { FillSecureDataComponent } from './fill-secure-data.component';
import { AuthService } from '@commons/services/auth/auth.service';
import { SecurityService } from '@commons/security/services/security.service';
import { Security } from '@commons/security/utils/security';
import { AuthFacade } from '@modules/auth/auth.facade';
import { AuthFacadeMock } from '@test-helpers/mocks/facade/auth.facade.mock';
import { AuthTokenService } from '@commons/services/auth/auth-token.service';
import { AuthTokenServiceMock } from '@test-helpers/mocks/services/auth-token-service.mock';
import { ISecureDataBriefQuestion } from '@modules/auth/entities/auth.interface';

describe('FillSecureDataComponent', () => {
  let component: FillSecureDataComponent;
  let fixture: ComponentFixture<FillSecureDataComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FillSecureDataComponent],
        imports: [IonicModule, TestingModule],
        providers: [
          AuthService,
          SecurityService,
          Security,
          {
            provide: AuthFacade,
            useClass: AuthFacadeMock
          },
          {
            provide: AuthTokenService,
            useClass: AuthTokenServiceMock
          }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(FillSecureDataComponent);
      component = fixture.componentInstance;

      fixture.detectChanges();
    })
  );

  it('should create ', () => {
    expect(component).toBeTruthy();
  });
  it('get productType retunr an correctly string', () => {
    const secureDataBriefQuestion: ISecureDataBriefQuestion = {
      length: 1,
      question: 'testQuestion',
      accountType: 'testAccountType',
      questionType: 'product',
      productType: 'testProductType'
    };
    component.secureDataBriefQuestion = secureDataBriefQuestion;
    const productType = component.productType;
    expect(productType).toBeInstanceOf(String);
    expect(productType).not.toBeNaN();
    expect(productType).not.toBeNull();
  });

  it('get concatData works correctly', () => {
    const spy = spyOn(component, 'submitEnrollment').and.callFake(() => null);
    component.concatData();
    expect(spy).toHaveBeenCalled();
  });

  it('get concatData works correctly with isTel ', () => {
    const secureDataBriefQuestion: ISecureDataBriefQuestion = {
      length: 1,
      question: 'testQuestion',
      accountType: 'testAccountType',
      questionType: 'product',
      productType: 'testProductType'
    };
    component.secureDataBriefQuestion = secureDataBriefQuestion;
    const spy = spyOn(component, 'submitEnrollment').and.callFake(() => null);
    component.concatData();
    expect(spy).toHaveBeenCalled();
  });
});
