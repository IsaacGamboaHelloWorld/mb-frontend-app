import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';

import { ModalOtherProductsComponent } from './modal-other-products.component';
import { TestingModule } from '@test-helpers/testing.module';
import { HomeFacade } from '@modules/home/home.facade';
import { HomeFacadeMock } from '@test-helpers/mocks/facade/home.facade.mock';
import { IOtherProduct } from '../../store/home.state';
import { IProductsPack } from '@commons/entities/products.entities';

describe('ModalOtherProductsComponent', () => {
  let component: ModalOtherProductsComponent;
  let fixture: ComponentFixture<ModalOtherProductsComponent>;
  let store: MockStore;
  const initialState = { otherProducts: { products: [], toggle: false } };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ModalOtherProductsComponent],
        imports: [IonicModule, TestingModule, StoreModule.forRoot(null)],
        providers: [
          provideMockStore({ initialState }),
          {
            provide: HomeFacade,
            useClass: HomeFacadeMock
          }
        ],
        schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
      }).compileComponents();

      store = TestBed.inject(MockStore);
      fixture = TestBed.createComponent(ModalOtherProductsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return true, component.products$', (done: DoneFn) => {
    const observable$: Observable<IOtherProduct[]> = new BehaviorSubject([
      { key: 'keyMock', loading: true }
    ]);

    spyOnProperty(component, 'products$', 'get').and.returnValue(observable$);

    component.isLoading$.subscribe((resp) => {
      expect(resp).toBeTrue();
      done();
    });
  });

  it('should return false, hasProducts$', (done: DoneFn) => {
    const observable$: Observable<IOtherProduct[]> = new BehaviorSubject([
      { key: 'keyMock', loading: true },
      { key: 'keyMock2', loading: false }
    ]);

    spyOnProperty(component, 'products$', 'get').and.returnValue(observable$);

    component.hasProducts$.subscribe((resp) => {
      expect(resp).toBeFalse();
      done();
    });
  });

  it('should return AVAL_PRODUCTS.PRODUCT.LOADING, component.text()', () => {
    expect(component.text({ key: 'keyMock', loading: true })).toEqual(
      'AVAL_PRODUCTS.PRODUCT.LOADING'
    );
  });

  it('should return 0 AVAL_PRODUCTS.PRODUCT.TEXT, component.text()', () => {
    expect(component.text({ key: 'keyMock', completed: true })).toEqual(
      '0 AVAL_PRODUCTS.PRODUCT.TEXT'
    );
  });

  it('should return 0 AVAL_PRODUCTS.PRODUCT.TEXT, component.text()', () => {
    expect(component.text({ key: 'keyMock' })).toEqual(
      'AVAL_PRODUCTS.PRODUCT.ERROR'
    );
  });

  it('should return 2, component.lengthProducts()', () => {
    const pack: IProductsPack = {
      ['TC']: [{ status: 'ok' }],
      ['CDT']: [{ status: 'ok' }]
    };
    expect(component.lengthProducts(pack)).toEqual(2);
  });

  it('should call facade.loadOtherBank', () => {
    spyOn<any>(component['facade'], 'loadOtherBank');
    component.loadOtherBank('popular');
    expect(component['facade'].loadOtherBank).toHaveBeenCalled();
  });

  it('should call facade.changeToggleAval', () => {
    spyOn<any>(component['facade'], 'changeToggleAval');
    component.close();
    expect(component['facade'].changeToggleAval).toHaveBeenCalled();
  });
});
