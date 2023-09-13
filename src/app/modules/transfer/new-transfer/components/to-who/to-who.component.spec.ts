import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AbstractControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { ToWhoComponent } from '@modules/transfer/new-transfer/components/to-who/to-who.component';
import { TestingModule } from '@test-helpers/testing.module';
import { NewTransferFacade } from '@modules/transfer/transfer.facade';
import { NewTransferFacadeMock } from '@test-helpers/mocks/facade/new-transfer.facade.mock';
import { MainContainerFacade } from '@modules/main-container/main-container.facade';
import { MainContainerFacadeMock } from '@test-helpers/mocks/facade/main-container.facade.mock';
import { IRegisteredAccount } from '@modules/transfer/entities/registered-account.entities';
import { IRegisteredAccountState } from '@modules/transfer/store/transfer.state';
import { IConfigTemplate } from '@commons/velocity/templates/utils/entities/config.entities';
import { Product } from '@commons/models/product.model';

describe('ToWhoComponent', () => {
  let component: ToWhoComponent;
  let fixture: ComponentFixture<ToWhoComponent>;
  let serviceFacade: NewTransferFacade;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ToWhoComponent],
        imports: [IonicModule, TestingModule],
        providers: [
          {
            provide: NewTransferFacade,
            useClass: NewTransferFacadeMock
          },
          {
            provide: MainContainerFacade,
            useClass: MainContainerFacadeMock
          }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(ToWhoComponent);
      component = fixture.componentInstance;
      serviceFacade = fixture.debugElement.injector.get(NewTransferFacade);
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('get param to corretly', () => {
    const to = component.to;
    expect(to).toBeInstanceOf(AbstractControl);
  });

  it('typeBank return an ITypeBank object with bakId 0001', () => {
    const product: IRegisteredAccount = {
      destinationAccountId: '',
      destinationAccountType: '',
      customerId: '',
      customerIdType: '',
      customerName: '',
      bankId: '0001',
      bankName: ''
    };
    const typeBank = component.typeBank(product);
    expect(typeBank).not.toBeNaN();
    expect(typeBank).not.toBeNull();
  });
  it('typeBank return an ITypeBank object with bakId 0002', () => {
    const product: IRegisteredAccount = {
      destinationAccountId: '',
      destinationAccountType: '',
      customerId: '',
      customerIdType: '',
      customerName: '',
      bankId: '0002',
      bankName: ''
    };
    const typeBank = component.typeBank(product);
    expect(typeBank).not.toBeNaN();
    expect(typeBank).not.toBeNull();
  });
  it('typeBank return an ITypeBank object with bakId 0006', () => {
    const product: IRegisteredAccount = {
      destinationAccountId: '',
      destinationAccountType: '',
      customerId: '',
      customerIdType: '',
      customerName: '',
      bankId: '0006',
      bankName: ''
    };
    const typeBank = component.typeBank(product);
    expect(typeBank).not.toBeNaN();
    expect(typeBank).not.toBeNull();
  });
  it('typeBank return an ITypeBank object with bakId 0007', () => {
    const product: IRegisteredAccount = {
      destinationAccountId: '',
      destinationAccountType: '',
      customerId: '',
      customerIdType: '',
      customerName: '',
      bankId: '0007',
      bankName: ''
    };
    const typeBank = component.typeBank(product);
    expect(typeBank).not.toBeNaN();
    expect(typeBank).not.toBeNull();
  });
  it('typeBank return an ITypeBank object with bakId 0009', () => {
    const product: IRegisteredAccount = {
      destinationAccountId: '',
      destinationAccountType: '',
      customerId: '',
      customerIdType: '',
      customerName: '',
      bankId: '0009',
      bankName: ''
    };
    const typeBank = component.typeBank(product);
    expect(typeBank).not.toBeNaN();
    expect(typeBank).not.toBeNull();
  });

  it('typeBank return an ITypeBank object with bakId 0012', () => {
    const product: IRegisteredAccount = {
      destinationAccountId: '',
      destinationAccountType: '',
      customerId: '',
      customerIdType: '',
      customerName: '',
      bankId: '0012',
      bankName: ''
    };
    const typeBank = component.typeBank(product);
    expect(typeBank).not.toBeNaN();
    expect(typeBank).not.toBeNull();
  });

  it('typeBank return an ITypeBank object with bakId 0013', () => {
    const product: IRegisteredAccount = {
      destinationAccountId: '',
      destinationAccountType: '',
      customerId: '',
      customerIdType: '',
      customerName: '',
      bankId: '0013',
      bankName: ''
    };
    const typeBank = component.typeBank(product);
    expect(typeBank).not.toBeNaN();
    expect(typeBank).not.toBeNull();
  });
  it('typeBank return an ITypeBank object with bakId 0019', () => {
    const product: IRegisteredAccount = {
      destinationAccountId: '',
      destinationAccountType: '',
      customerId: '',
      customerIdType: '',
      customerName: '',
      bankId: '0019',
      bankName: ''
    };
    const typeBank = component.typeBank(product);
    expect(typeBank).not.toBeNaN();
    expect(typeBank).not.toBeNull();
  });
  it('typeBank return an ITypeBank object with bakId 0023', () => {
    const product: IRegisteredAccount = {
      destinationAccountId: '',
      destinationAccountType: '',
      customerId: '',
      customerIdType: '',
      customerName: '',
      bankId: '0023',
      bankName: ''
    };
    const typeBank = component.typeBank(product);
    expect(typeBank).not.toBeNaN();
    expect(typeBank).not.toBeNull();
  });
  it('typeBank return an ITypeBank object with bakId 0031', () => {
    const product: IRegisteredAccount = {
      destinationAccountId: '',
      destinationAccountType: '',
      customerId: '',
      customerIdType: '',
      customerName: '',
      bankId: '0031',
      bankName: ''
    };
    const typeBank = component.typeBank(product);
    expect(typeBank).not.toBeNaN();
    expect(typeBank).not.toBeNull();
  });
  it('typeBank return an ITypeBank object with bakId 0032', () => {
    const product: IRegisteredAccount = {
      destinationAccountId: '',
      destinationAccountType: '',
      customerId: '',
      customerIdType: '',
      customerName: '',
      bankId: '0032',
      bankName: ''
    };
    const typeBank = component.typeBank(product);
    expect(typeBank).not.toBeNaN();
    expect(typeBank).not.toBeNull();
  });
  it('typeBank return an ITypeBank object with bakId 0040', () => {
    const product: IRegisteredAccount = {
      destinationAccountId: '',
      destinationAccountType: '',
      customerId: '',
      customerIdType: '',
      customerName: '',
      bankId: '0040',
      bankName: ''
    };
    const typeBank = component.typeBank(product);
    expect(typeBank).not.toBeNaN();
    expect(typeBank).not.toBeNull();
  });
  it('typeBank return an ITypeBank object with bakId 0042', () => {
    const product: IRegisteredAccount = {
      destinationAccountId: '',
      destinationAccountType: '',
      customerId: '',
      customerIdType: '',
      customerName: '',
      bankId: '0042',
      bankName: ''
    };
    const typeBank = component.typeBank(product);
    expect(typeBank).not.toBeNaN();
    expect(typeBank).not.toBeNull();
  });
  it('typeBank return an ITypeBank object with bakId 0051', () => {
    const product: IRegisteredAccount = {
      destinationAccountId: '',
      destinationAccountType: '',
      customerId: '',
      customerIdType: '',
      customerName: '',
      bankId: '0051',
      bankName: ''
    };
    const typeBank = component.typeBank(product);
    expect(typeBank).not.toBeNaN();
    expect(typeBank).not.toBeNull();
  });
  it('typeBank return an ITypeBank object with bakId 0052', () => {
    const product: IRegisteredAccount = {
      destinationAccountId: '',
      destinationAccountType: '',
      customerId: '',
      customerIdType: '',
      customerName: '',
      bankId: '0052',
      bankName: ''
    };
    const typeBank = component.typeBank(product);
    expect(typeBank).not.toBeNaN();
    expect(typeBank).not.toBeNull();
  });
  it('typeBank return an ITypeBank object with bakId 0058', () => {
    const product: IRegisteredAccount = {
      destinationAccountId: '',
      destinationAccountType: '',
      customerId: '',
      customerIdType: '',
      customerName: '',
      bankId: '0058',
      bankName: ''
    };
    const typeBank = component.typeBank(product);
    expect(typeBank).not.toBeNaN();
    expect(typeBank).not.toBeNull();
  });
  it('typeBank return an ITypeBank object with bakId 0059', () => {
    const product: IRegisteredAccount = {
      destinationAccountId: '',
      destinationAccountType: '',
      customerId: '',
      customerIdType: '',
      customerName: '',
      bankId: '0059',
      bankName: ''
    };
    const typeBank = component.typeBank(product);
    expect(typeBank).not.toBeNaN();
    expect(typeBank).not.toBeNull();
  });
  it('typeBank return an ITypeBank object with bakId 0060', () => {
    const product: IRegisteredAccount = {
      destinationAccountId: '',
      destinationAccountType: '',
      customerId: '',
      customerIdType: '',
      customerName: '',
      bankId: '0060',
      bankName: ''
    };
    const typeBank = component.typeBank(product);
    expect(typeBank).not.toBeNaN();
    expect(typeBank).not.toBeNull();
  });
  it('typeBank return an ITypeBank object with bakId 0061', () => {
    const product: IRegisteredAccount = {
      destinationAccountId: '',
      destinationAccountType: '',
      customerId: '',
      customerIdType: '',
      customerName: '',
      bankId: '0061',
      bankName: ''
    };
    const typeBank = component.typeBank(product);
    expect(typeBank).not.toBeNaN();
    expect(typeBank).not.toBeNull();
  });
  it('typeBank return an ITypeBank object with bakId 0062', () => {
    const product: IRegisteredAccount = {
      destinationAccountId: '',
      destinationAccountType: '',
      customerId: '',
      customerIdType: '',
      customerName: '',
      bankId: '0062',
      bankName: ''
    };
    const typeBank = component.typeBank(product);
    expect(typeBank).not.toBeNaN();
    expect(typeBank).not.toBeNull();
  });
  it('typeBank return an ITypeBank object with bakId 0063', () => {
    const product: IRegisteredAccount = {
      destinationAccountId: '',
      destinationAccountType: '',
      customerId: '',
      customerIdType: '',
      customerName: '',
      bankId: '0063',
      bankName: ''
    };
    const typeBank = component.typeBank(product);
    expect(typeBank).not.toBeNaN();
    expect(typeBank).not.toBeNull();
  });
  it('typeBank return an ITypeBank object with bakId 0064', () => {
    const product: IRegisteredAccount = {
      destinationAccountId: '',
      destinationAccountType: '',
      customerId: '',
      customerIdType: '',
      customerName: '',
      bankId: '0064',
      bankName: ''
    };
    const typeBank = component.typeBank(product);
    expect(typeBank).not.toBeNaN();
    expect(typeBank).not.toBeNull();
  });
  it('typeBank return an ITypeBank object with bakId 0065', () => {
    const product: IRegisteredAccount = {
      destinationAccountId: '',
      destinationAccountType: '',
      customerId: '',
      customerIdType: '',
      customerName: '',
      bankId: '0065',
      bankName: ''
    };
    const typeBank = component.typeBank(product);
    expect(typeBank).not.toBeNaN();
    expect(typeBank).not.toBeNull();
  });
  it('typeBank return an ITypeBank object with bakId 0066', () => {
    const product: IRegisteredAccount = {
      destinationAccountId: '',
      destinationAccountType: '',
      customerId: '',
      customerIdType: '',
      customerName: '',
      bankId: '0066',
      bankName: ''
    };
    const typeBank = component.typeBank(product);
    expect(typeBank).not.toBeNaN();
    expect(typeBank).not.toBeNull();
  });
  it('typeBank return an ITypeBank object with bakId 0067', () => {
    const product: IRegisteredAccount = {
      destinationAccountId: '',
      destinationAccountType: '',
      customerId: '',
      customerIdType: '',
      customerName: '',
      bankId: '0067',
      bankName: ''
    };
    const typeBank = component.typeBank(product);
    expect(typeBank).not.toBeNaN();
    expect(typeBank).not.toBeNull();
  });
  it('typeBank return an ITypeBank object with bakId 0121', () => {
    const product: IRegisteredAccount = {
      destinationAccountId: '',
      destinationAccountType: '',
      customerId: '',
      customerIdType: '',
      customerName: '',
      bankId: '0121',
      bankName: ''
    };
    const typeBank = component.typeBank(product);
    expect(typeBank).not.toBeNaN();
    expect(typeBank).not.toBeNull();
  });
  it('typeBank return an ITypeBank object with bakId 0283', () => {
    const product: IRegisteredAccount = {
      destinationAccountId: '',
      destinationAccountType: '',
      customerId: '',
      customerIdType: '',
      customerName: '',
      bankId: '0283',
      bankName: ''
    };
    const typeBank = component.typeBank(product);
    expect(typeBank).not.toBeNaN();
    expect(typeBank).not.toBeNull();
  });
  it('typeBank return an ITypeBank object with bakId 0370', () => {
    const product: IRegisteredAccount = {
      destinationAccountId: '',
      destinationAccountType: '',
      customerId: '',
      customerIdType: '',
      customerName: '',
      bankId: '0370',
      bankName: ''
    };
    const typeBank = component.typeBank(product);
    expect(typeBank).not.toBeNaN();
    expect(typeBank).not.toBeNull();
  });
  it('typeBank return an ITypeBank object with bakId 0292', () => {
    const product: IRegisteredAccount = {
      destinationAccountId: '',
      destinationAccountType: '',
      customerId: '',
      customerIdType: '',
      customerName: '',
      bankId: '0292',
      bankName: ''
    };
    const typeBank = component.typeBank(product);
    expect(typeBank).not.toBeNaN();
    expect(typeBank).not.toBeNull();
  });
  it('typeBank return an ITypeBank object with bakId 0507', () => {
    const product: IRegisteredAccount = {
      destinationAccountId: '',
      destinationAccountType: '',
      customerId: '',
      customerIdType: '',
      customerName: '',
      bankId: '0507',
      bankName: ''
    };
    const typeBank = component.typeBank(product);
    expect(typeBank).not.toBeNaN();
    expect(typeBank).not.toBeNull();
  });
  it('typeBank return an ITypeBank object with bakId 0289', () => {
    const product: IRegisteredAccount = {
      destinationAccountId: '',
      destinationAccountType: '',
      customerId: '',
      customerIdType: '',
      customerName: '',
      bankId: '0289',
      bankName: ''
    };
    const typeBank = component.typeBank(product);
    expect(typeBank).not.toBeNaN();
    expect(typeBank).not.toBeNull();
  });
  it('typeBank return an ITypeBank object with bakId default', () => {
    const product: IRegisteredAccount = {
      destinationAccountId: '',
      destinationAccountType: '',
      customerId: '',
      customerIdType: '',
      customerName: '',
      bankId: '',
      bankName: ''
    };
    const typeBank = component.typeBank(product);
    expect(typeBank).not.toBeNaN();
    expect(typeBank).not.toBeNull();
  });

  it('changeTo works correctly', () => {
    const el = new CustomEvent('el', { detail: true });
    const spy = spyOn(component as any, '_fetchCost').and.callThrough();
    component.changeTo(el);
    expect(spy).not.toHaveBeenCalled();
  });

  it('trackByTo returns an string', () => {
    const product: IRegisteredAccount = {
      destinationAccountId: 'customerId',
      destinationAccountType: 'CC',
      customerId: '123',
      customerIdType: 'CC',
      customerName: 'testName',
      bankId: '123',
      bankName: 'testBankName'
    };
    const trackByTo = component.trackByTo(1, product);
    expect(trackByTo).not.toBeNull();
    expect(trackByTo).not.toBeNaN();
    expect(trackByTo).toBeInstanceOf(String);
  });

  it('change works correctly', () => {
    const spyResetRegistered = spyOn(
      serviceFacade,
      'resetRegistered'
    ).and.callFake(() => null);
    const spyResetCost = spyOn(serviceFacade, 'resetCost').and.callFake(
      () => null
    );
    const spyFetchRegisteredAccount = spyOn(
      serviceFacade,
      'fetchRegisteredAccount'
    ).and.callFake(() => null);
    const el = new CustomEvent('el', { detail: true });
    component.change(el);
    expect(spyResetRegistered).toHaveBeenCalled();
    expect(spyResetCost).toHaveBeenCalled();
    expect(spyFetchRegisteredAccount).toHaveBeenCalled();
  });

  it('destinationAccountId should be equal to idMock', () => {
    const data: IRegisteredAccountState = {
      products: [
        {
          destinationAccountId: 'idMock',
          destinationAccountType: 'typeAccountMock',
          customerId: '',
          customerIdType: '',
          customerName: '',
          bankId: '',
          bankName: ''
        }
      ],
      loading: false,
      completed: true,
      error: false,
      errorMessage: ''
    };

    const resp: BehaviorSubject<IRegisteredAccountState> = new BehaviorSubject(
      data
    );

    component.formNewTransferToWho.setValue({
      from: {
        id: 'idMock'
      },
      to: 'toMock'
    });

    component['facade'].registeredAccount$ = resp;
    component.registeredAccounts.subscribe((resp) => {
      expect(resp.products[0].destinationAccountId).toEqual('idMock');
    });
  });

  it('should call component._fetchCost', () => {
    const event = new CustomEvent('mockEvent', {
      detail: { value: 'valueMock' }
    });
    spyOn<any>(component, '_fetchCost');
    component.changeTo(event);
    expect(component['_fetchCost']).toHaveBeenCalled();
  });

  it('should call facade.fetchRegisteredAccount', () => {
    const spy = spyOn<any>(component['facade'], 'fetchRegisteredAccount');
    component.fetchAffiliations();
    expect(spy).toHaveBeenCalled();
  });

  it('PRUEBA', () => {
    component.formNewTransferToWho.setValue({
      from: {
        id: 'idMock',
        productAccountBalances: {
          saldo_disponible: {
            amount: 10000
          }
        }
      },
      to: 'toMock'
    });

    const config: IConfigTemplate = {
      beforeUrl: '',
      defaultUrl: '',
      toWho: null,
      router: [
        {
          url: '',
          step: 1
        },
        {
          url: '',
          step: 2
        }
      ],
      ionContent: null
    };
    component['configTemplate'].setConfig(config);
    const spy = spyOn(component['configTemplate'], 'changeStep');
    component.submitForm();
    expect(spy).toHaveBeenCalled();
  });

  it('should call facade.fetchCost', () => {
    component.formNewTransferToWho.setValue({
      from: {
        id: 'idMock',
        productAccountBalances: {
          saldo_disponible: {
            amount: 10000
          }
        }
      },
      to: 'toMock'
    });

    const event = new CustomEvent('mockEvent', {
      detail: { value: 'valueMock' }
    });

    spyOn(component['facade'], 'fetchCost');
    component['_fetchCost'](event);
    expect(component['facade'].fetchCost).toHaveBeenCalled();
  });

  it('should call facade.fetchRegisteredAccount', () => {
    const template = {
      toWho: {
        from: null
      },
      confirmation: '',
      success: '',
      stepActive: '',
      finish: true
    };
    component['saveDataTemplateService'].saveDataTemplate(template);

    const product: Product = {
      id: 'idMock',
      typeAccount: 'typeAccountMock'
    };

    const product$: Observable<Product> = new BehaviorSubject(product);
    spyOn<any>(component, 'loadSelectedProduct').and.returnValue(product$);
    spyOn<any>(component['facade'], 'fetchRegisteredAccount');
    component['_initForm']();
    expect(component['facade'].fetchRegisteredAccount).toHaveBeenCalled();
  });
});
