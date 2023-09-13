import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, MenuController } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Router } from '@angular/router';

import { HomePage } from './home.page';
import { TestingModule } from '@test-helpers/testing.module';
import { HomeFacade } from '@modules/home/home.facade';
import { SecurityService } from '@app/commons/security/services/security.service';
import { Security } from '@commons/security/utils/security';
import { HomeFacadeMock } from '@test-helpers/mocks/facade/home.facade.mock';
import { OrderProductsPipe } from '@modules/home/pipes/order-products.pipe';
import { KeysPipe } from '@modules/home/pipes/keys.pipe';
import { AppFacadeMock } from '@test-helpers/mocks/facade/app.facade.mock';
import { AppFacade } from '@app/app.facade';
import { IProductBasic } from '@modules/main-container/entities/main-products.entities';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let homeFacadeService: HomeFacade;
  let routerService: Router;
  let menuService: MenuController;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [HomePage, OrderProductsPipe, KeysPipe],
        imports: [IonicModule, TestingModule],
        providers: [
          {
            provide: AppFacade,
            useClass: AppFacadeMock
          },
          {
            provide: HomeFacade,
            useClass: HomeFacadeMock
          },
          SecurityService,
          Security,
          MenuController,
          InAppBrowser
        ],
        schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(HomePage);
      component = fixture.componentInstance;
      homeFacadeService = fixture.debugElement.injector.get(HomeFacade);
      routerService = fixture.debugElement.injector.get(Router);
      menuService = fixture.debugElement.injector.get(MenuController);
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    component.fetchProducts();
    component.trackByFn(0, { key: 'test' });
    component.ionViewDidLeave();
    component.otherProducts$;
    expect(component).toBeTruthy();
  });
  it('payrollLoanCreditType return a string', () => {
    const creditTye = component.payrollLoanCreditType;
    component.nicknames$;
    expect(creditTye).toBeInstanceOf(String);
    expect(creditTye).not.toBeNull();
    expect(creditTye).not.toBeNaN();
  });
  it('freeDestinationCreditType return a string', () => {
    const freeDestinationCreditType = component.freeDestinationCreditType;
    component.payRollLoans$;
    expect(freeDestinationCreditType).toBeInstanceOf(String);
    expect(freeDestinationCreditType).not.toBeNull();
    expect(freeDestinationCreditType).not.toBeNaN();
  });
  it('urlOpenDepositAccount return a string', () => {
    const urlOpenDepositAccount = component.urlOpenDepositAccount;
    component.freeDestination$;
    expect(urlOpenDepositAccount).toBeInstanceOf(String);
    expect(urlOpenDepositAccount).not.toBeNull();
    expect(urlOpenDepositAccount).not.toBeNaN();
  });
  it('urlOpenCDT return a string', () => {
    const urlOpenCDT = component.urlOpenCDT;
    expect(urlOpenCDT).toBeInstanceOf(String);
    expect(urlOpenCDT).not.toBeNull();
    expect(urlOpenCDT).not.toBeNaN();
  });
  it('urlOpenTC return a string', () => {
    const urlOpenTC = component.urlOpenTC;
    expect(urlOpenTC).toBeInstanceOf(String);
    expect(urlOpenTC).not.toBeNull();
    expect(urlOpenTC).not.toBeNaN();
  });
  it('retryProduct work correctly ', () => {
    const spy = spyOn(homeFacadeService, 'fetchProduct').and.callFake(
      () => null
    );
    const parameterTest: IProductBasic = {
      type: '',
      id: ''
    };
    component.retryProduct(parameterTest);
    expect(spy).toHaveBeenCalled();
  });

  it('goToMessages works correctly', () => {
    const spy = spyOn(routerService, 'navigate').and.callFake(() => null);
    component.goToMessages();
    expect(spy).toHaveBeenCalled();
  });
  it('goToMessages works correctly', () => {
    const spy = spyOn(menuService, 'toggle').and.callFake(() => null);
    component.toggleMenu();
    expect(spy).toHaveBeenCalled();
  });
  it('openModalAval works correctly', () => {
    const spy = spyOn(homeFacadeService, 'changeToggleAval').and.callFake(
      () => null
    );
    component.openModalAval();
    expect(spy).toHaveBeenCalled();
  });
  it('toggleRollLoans works correctly', () => {
    const spy = spyOn(homeFacadeService, 'changeToggleCredits').and.callFake(
      () => null
    );
    component.toggleRollLoans();
    expect(spy).toHaveBeenCalled();
  });
  it('fetchRollLoans works correctly', () => {
    const spy = spyOn(homeFacadeService, 'fetchRollLoans').and.callFake(
      () => null
    );
    component.fetchRollLoans();
    expect(spy).toHaveBeenCalled();
  });
  it('fetchFreeDestination works correctly', () => {
    const spy = spyOn(homeFacadeService, 'fetchFreeDestination').and.callFake(
      () => null
    );
    component.fetchFreeDestination();
    expect(spy).toHaveBeenCalled();
  });
});
