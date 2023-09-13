import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UrlSerializer } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { IonicModule, NavController } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppFacade } from '@app/app.facade';
import { AppFacadeMock } from '@test-helpers/mocks/facade/app.facade.mock';
import { TestingModule } from '@test-helpers/testing.module';
import { RequestProductPage } from './request-product.page';
import { PageOpenAccountService } from '@commons/velocity/pages/utils/page-open-account.service';

describe('RequestProductPage', () => {
  let component: RequestProductPage;
  let fixture: ComponentFixture<RequestProductPage>;
  let routerSpy = {
    navigateRoot: jasmine.createSpy('navigateRoot'),
    navigateForward: jasmine.createSpy('navigateForward')
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [RequestProductPage],
        imports: [IonicModule, TestingModule],
        providers: [
          PageOpenAccountService,
          UrlSerializer,
          {
            provide: InAppBrowser,
            useValue: { create: () => {} }
          },
          {
            provide: AppFacade,
            useClass: AppFacadeMock
          },
          {
            provide: NavController,
            useValue: routerSpy
          }
        ],
        schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(RequestProductPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be DEPOSIT_ACCOUNT', async () => {
    await component.navigateTo('DEPOSIT_ACCOUNT');
    expect(component['pageOpenAccountService'].params.title).toEqual(
      'OPEN_ACCOUNT_SCREEN.REQUEST_DEPOSIT_ACCOUNT.TITLE'
    );
  });

  it('should be CREDIT_CARD', async () => {
    await component.navigateTo('CREDIT_CARD');
    expect(component['pageOpenAccountService'].params.title).toEqual(
      'OPEN_ACCOUNT_SCREEN.REQUEST_NEW_CREDIT_CARD.TITLE'
    );
  });

  it('should navigate to expect route', () => {
    component.back();
    expect(routerSpy.navigateRoot).toHaveBeenCalledWith(['']);
  });
});
