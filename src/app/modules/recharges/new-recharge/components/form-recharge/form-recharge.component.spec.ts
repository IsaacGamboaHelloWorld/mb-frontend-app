import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { FormRechargeComponent } from 'src/app/modules/recharges/new-recharge/components/form-recharge/form-recharge.component';
import { TestingModule } from '@test-helpers/testing.module';
import { RechargesFacade } from '@modules/recharges/new-recharge/recharges.facade';
import { RechargesFacadeMock } from '@test-helpers/mocks/facade/recharges.facade.mock';
import { MainContainerFacade } from '@modules/main-container/main-container.facade';
import { MainContainerFacadeMock } from '@test-helpers/mocks/facade/main-container.facade.mock';
import { Product } from '@commons/models/product.model';

describe('FormRechargeComponent', () => {
  let component: FormRechargeComponent;
  let fixture: ComponentFixture<FormRechargeComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FormRechargeComponent],
        imports: [IonicModule, TestingModule],
        providers: [
          {
            provide: RechargesFacade,
            useClass: RechargesFacadeMock
          },
          {
            provide: MainContainerFacade,
            useClass: MainContainerFacadeMock
          }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(FormRechargeComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      component.formRecharge.setValue({
        from: {
          id: 'idMock',
          productAccountBalances: {
            saldo_disponible: {
              amount: 10000
            }
          }
        },
        to: 'toMock',
        phoneNumber: '301 6581674',
        amount: 10000
      });
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be equal to toMock', () => {
    expect(component.to.value).toEqual('toMock');
  });

  it('trackByTo return a string', () => {
    const product: Product = {
      id: 'dueDate',
      status: '',
      openedDate: '',
      closedDate: '',
      dueDate: 'test'
    };
    const trackBy = component.trackBy(0, product);
    expect(trackBy).toBeInstanceOf(String);
    expect(trackBy).toBe('test');
    expect(trackBy).not.toBeNaN();
  });

  it('should be equal to clickMock', () => {
    component.hiddenElement = {
      el: {
        click() {
          return 'clickMock';
        }
      }
    };
    const valueMock: any = component.changeAccount();
    expect(valueMock).toEqual('clickMock');
  });

  it('should call saveDataTemplateService.saveDataTemplate', () => {
    let routerA = {
      url: '/',
      step: 1
    };
    let routerB = {
      url: '/',
      step: 2
    };
    let config = {
      beforeUrl: '/',
      defaultUrl: '/',
      toWho: null,
      router: [routerA, routerB],
      ionContent: null,
      lineTime: [],
      emitButtons: false
    };
    component['configTemplate'].setConfig(config);

    spyOn<any>(component['saveDataTemplateService'], 'saveDataTemplate');
    component.submitRecharge();
    expect(
      component['saveDataTemplateService'].saveDataTemplate
    ).toHaveBeenCalled();
  });
});
