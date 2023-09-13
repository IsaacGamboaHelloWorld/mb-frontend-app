import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { ToWhoNotRegisteredComponent } from './to-who-not-registered.component';
import { NewTransferFacade } from '@modules/transfer/transfer.facade';
import { NewTransferFacadeMock } from '@test-helpers/mocks/facade/new-transfer.facade.mock';
import { MainContainerFacade } from '@modules/main-container/main-container.facade';
import { MainContainerFacadeMock } from '@test-helpers/mocks/facade/main-container.facade.mock';
import { TestingModule } from '@test-helpers/testing.module';

describe('ToWhoNotRegisteredComponent', () => {
  let component: ToWhoNotRegisteredComponent;
  let fixture: ComponentFixture<ToWhoNotRegisteredComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ToWhoNotRegisteredComponent],
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

      fixture = TestBed.createComponent(ToWhoNotRegisteredComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call configTemplate.changeStep', () => {
    component.formNewTransferToWho.setValue({
      from: {
        productAccountBalances: {
          saldo_disponible: {
            amount: 10000,
            currencyCode: '',
            rate: '',
            description: '',
            lastTransactionDate: ''
          }
        }
      },
      bank: 'banckMock',
      typeAccount: 'DEPOSIT_ACCOUNT',
      numberAccount: '210040736795'
    });

    spyOn<any>(component['configTemplate'], 'changeStep');
    component.submitForm();
    expect(component['configTemplate'].changeStep).toHaveBeenCalled();
  });
});
