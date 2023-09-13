import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

import { GroupProductsComponent } from './group-products.component';
import { TestingModule } from '@test-helpers/testing.module';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TYPE_ACCOUNTS } from '@commons/constants/types_account';
import { TypeCreditCardPipe } from '@commons/pipes/type-credit-card.pipe';
import { HomeFacade } from '@modules/home/home.facade';
import { HomeFacadeMock } from '@test-helpers/mocks/facade/home.facade.mock';
import { Product } from '@commons/models/product.model';

describe('GroupProductsComponent', () => {
  let component: GroupProductsComponent;
  let fixture: ComponentFixture<GroupProductsComponent>;

  let routerSpy = { navigate: jasmine.createSpy('navigate') };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [GroupProductsComponent],
        imports: [IonicModule, TestingModule],
        providers: [
          TypeCreditCardPipe,
          {
            provide: HomeFacade,
            useClass: HomeFacadeMock
          },
          { provide: Router, useValue: routerSpy }
        ],
        schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(GroupProductsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate gets', () => {
    component.products = createProducts(TYPE_ACCOUNTS.DEPOSIT_ACCOUNT);
    component.typeAccount = TYPE_ACCOUNTS.DEPOSIT_ACCOUNT;
    component.trackByFn(0, component.products[0]);
    expect(component.hasProducts).toBeTruthy();
    expect(component.sufficientSlides).toBeTruthy();
    expect(component.quantityProducts).toBe(2);
  });

  it('should validate credit', () => {
    component.products = createProducts(TYPE_ACCOUNTS.CREDIT_CARD);
    component.typeAccount = TYPE_ACCOUNTS.CREDIT_CARD;
    expect(component.hasProducts).toBeTruthy();
  });

  it('should validate CDT', () => {
    component.products = createProducts(TYPE_ACCOUNTS.CERTIFIED_DEPOSIT_TERM);
    component.typeAccount = TYPE_ACCOUNTS.CERTIFIED_DEPOSIT_TERM;
    expect(component.hasProducts).toBeTruthy();
  });

  it('should validate Current Account', () => {
    component.products = createProducts(TYPE_ACCOUNTS.CURRENT_ACCOUNT);
    component.typeAccount = TYPE_ACCOUNTS.CURRENT_ACCOUNT;
    component.typeAccounts;
    component.setProduct(createProducts(TYPE_ACCOUNTS.CURRENT_ACCOUNT)[0]);
    component.setProduct(createProducts(TYPE_ACCOUNTS.DEPOSIT_ACCOUNT)[0]);
    component.setProduct(createProducts(TYPE_ACCOUNTS.CREDIT_CARD)[0]);
    component.setProduct(createProducts(TYPE_ACCOUNTS.FIDUCIARY)[0]);
    component.setProduct(
      createProducts(TYPE_ACCOUNTS.CERTIFIED_DEPOSIT_TERM)[0]
    );
    expect(component.hasProducts).toBeTruthy();
  });

  function createProducts(name: string): any[] {
    return [
      {
        typeAccount: name,
        accountIdentifier: '5361709913673388',
        accountInformation: {
          accountIdentifier: '5361709913673388',
          productType: name,
          currencyCode: null,
          bank: 'BANCO_POPULAR'
        },
        status: 'PENDING_FOR_MAPPING4',
        openedDate: null,
        closedDate: null,
        dueDate: null,
        minimumPayment: 3862899.6,
        overDraftDays: null,
        term: null,
        periodicityOfPayment: null,
        productAccountBalances: {
          pago_total_pesos: {
            amount: 3862899.6,
            currencyCode: 'COP',
            rate: null
          },
          cupo_disponible_avances_pesos: {
            amount: 6137100.4,
            currencyCode: 'COP',
            rate: null
          },
          saldo_mora_pesos: {
            amount: 2910500,
            currencyCode: 'COP',
            rate: null
          },
          saldo_actual: {
            amount: 3862899.6,
            currencyCode: 'COP',
            rate: null
          },
          cupo_disponible_compras_pesos: {
            amount: 6137100.4,
            currencyCode: 'COP',
            rate: null
          },
          valor_pago_minimo: {
            amount: 952399.6,
            currencyCode: 'COP',
            rate: null
          },
          cupo_total: {
            amount: 10000000,
            currencyCode: 'COP',
            rate: null
          }
        }
      },
      {
        typeAccount: name,
        id: '1234234',
        nameAccount: 'text'
      }
    ];
  }

  it('should be false isOnly()', () => {
    const products = [{ value: 1 }, { value: 2 }];
    expect(component.isOnly(products)).toBeFalse();
  });

  it('should be false neededToPay()', () => {
    const product: Product = {
      success: true
    };
    expect(component.neededToPay(product)).toBeFalse();
  });

  it('should be equal to 99 progress()', () => {
    spyOn(component, 'neededToPay').and.returnValue(false);
    const product: Product = {
      capacity: 1
    };
    expect(component.progress(product)).toEqual(99);
  });

  it('should navigate to expect route', () => {
    const product: Product = {
      id: 'idMock',
      typeAccount: 'typeAccountMock'
    };
    component.redirectPay(product);
    expect(routerSpy.navigate).toHaveBeenCalledWith([
      '/pagos/nuevo/obligaciones'
    ]);
  });

  it('should call facade', () => {
    spyOn<any>(component['facade'], 'toogleHiddenId');
    component.toogleHidden('typeAccountMock', 'idMock');
    expect(component['facade'].toogleHiddenId).toHaveBeenCalled();
  });
});
