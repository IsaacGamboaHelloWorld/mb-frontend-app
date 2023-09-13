import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { IonicModule } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

import { BlockProductPage } from './block-product.page';
import { TestingModule } from '@test-helpers/testing.module';
import { BlockProductsFacade } from '@modules/block-product/block-products.facade';
import { BlockProductsFacadeMock } from '@test-helpers/mocks/facade/block-products.facade.mock';
import { first } from 'rxjs/operators';

describe('BlockProductPage', () => {
  let component: BlockProductPage;
  let fixture: ComponentFixture<BlockProductPage>;
  let injectedBlockProductsFacade: BlockProductsFacade;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [BlockProductPage],
        imports: [IonicModule, TestingModule],
        providers: [
          InAppBrowser,
          {
            provide: BlockProductsFacade,
            useClass: BlockProductsFacadeMock
          }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(BlockProductPage);
      injectedBlockProductsFacade = TestBed.inject(BlockProductsFacade);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate error blockProduct$', (done: DoneFn) => {
    component.ionViewWillEnter();
    component.lengthCreditCard$.pipe(first()).subscribe((data) => {
      expect(data).toBeFalsy();
      done();
    });
    component.ionViewDidLeave();
  });

  it('should validate complete blockProduct$', (done: DoneFn) => {
    injectedBlockProductsFacade.blockProduct$ = new BehaviorSubject({
      loading: false,
      completed: true,
      error: false,
      errorMessage: ''
    });

    component.lengthCreditCard$.pipe(first()).subscribe((data) => {
      expect(data).toBeFalsy();
      done();
    });

    component.ionViewWillEnter();
  });
});
