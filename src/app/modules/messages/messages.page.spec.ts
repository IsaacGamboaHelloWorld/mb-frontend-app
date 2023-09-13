import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { MessagesPage } from './messages.page';
import { TestingModule } from '@test-helpers/testing.module';
import { AdlSecureStorageService } from '@commons/services/adl-security-storage.service';
import { MessagesFacade } from '@modules/messages/messages.facade';
import { MessagesFacadeMock } from '@test-helpers/mocks/facade/messages.facade.mock';
import { HOME } from '@commons/constants/navigatie-global';
import { STATUS_BUTTONS } from '@commons/velocity/templates/utils/entities/config.entities';
import { ModalService } from '@commons/services/modal.service';

describe('MessagesPage', () => {
  let component: MessagesPage;
  let fixture: ComponentFixture<MessagesPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MessagesPage],
        imports: [IonicModule, TestingModule],
        providers: [
          AdlSecureStorageService,
          ModalService,
          { provide: MessagesFacade, useClass: MessagesFacadeMock }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(MessagesPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  beforeEach(() => {});

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('init ionViewWillEnter', () => {
    component.loadMessages();
    component.showMessage({
      id: '292199',
      title: 'Información Saldo',
      content:
        'Saldo superior al tope establecido: Cuenta Ahorro No. *0068 saldo $ 6,202,329.87 tope $ 50.00',
      upDt: '2021-01-05T15:33:50',
      read: true,
      old: true,
      startDt: '2021-01-05T15:23:12'
    });
    component.openModal(() => {});
    component.modalService.setActionButton(STATUS_BUTTONS.primary);
    expect(component.hasDeleteMessage).toBeFalsy();
  });

  it('should be return HOME', () => {
    expect(component.home).toBe(HOME);
  });

  it('should be return same text', () => {
    expect(component.shortContent('hola')).toBe('hola');
  });

  it('validate toggle check', () => {
    component.toggleChecks();
    expect(component.showCheck).toBeTruthy();
    component.toggleChecks();
    expect(component.showCheck).toBeFalsy();
    expect(component.checkAll).toBeFalsy();
    expect(component.hasDeleteMessage).toBeFalsy();
  });

  it('validate customMessages', () => {
    component.customMessages({ id: '124', check: true });
    expect(component.hasDeleteMessage).toBeTruthy();
    component.customMessages({ id: '124', check: false });
    expect(component.hasDeleteMessage).toBeFalsy();
  });

  it('validate toggleSelectedAll', () => {
    component.toggleSelectedAll();
    expect(component.hasDeleteMessage).toBeTruthy();
    component.toggleSelectedAll();
    expect(component.hasDeleteMessage).toBeFalsy();
  });

  it('validate isSameDate', () => {
    component.back(component.home);
    expect(component.isSameDate('2021-01-05T15:23:12')).toBeFalsy();
  });
});
