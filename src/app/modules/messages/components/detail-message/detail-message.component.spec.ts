import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';

import { DetailMessageComponent } from './detail-message.component';
import { TestingModule } from '@test-helpers/testing.module';
import { MessagesFacade } from '@modules/messages/messages.facade';
import { MessagesFacadeMock } from '@test-helpers/mocks/facade/messages.facade.mock';
import { MESSAGES } from '@commons/constants/navigatie-global';

describe('DetailMessageComponent', () => {
  let component: DetailMessageComponent;
  let fixture: ComponentFixture<DetailMessageComponent>;
  let injectedService: MessagesFacade;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DetailMessageComponent],
        imports: [IonicModule, TestingModule],
        providers: [
          NavController,
          { provide: MessagesFacade, useClass: MessagesFacadeMock }
        ],
        schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
      }).compileComponents();

      injectedService = TestBed.inject(MessagesFacade);

      fixture = TestBed.createComponent(DetailMessageComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Validate params url', () => {
    component.ionViewWillEnter();
    expect(component.messageUrl).toBe(MESSAGES);
  });

  it('validate isSameDate', () => {
    component.back(component.messageUrl);
    expect(component.isSameDate('2021-01-05T15:23:12')).toBeFalsy();
  });

  it('Validate ionViewWillEnter works correctly only get messages', (done: DoneFn) => {
    injectedService.messages$.subscribe((value) => {
      expect(value).toBeDefined();
      done();
    });
  });
  it('Validate ionViewWillEnter works correctly only get routerParams$', (done: DoneFn) => {
    injectedService.routerParams$.subscribe((value) => {
      expect(value).toBeDefined();
      done();
    });
  });

  it('should call functions, deleteMessage()', () => {
    spyOn(component.modalService, 'close');
    spyOn(component['facade'], 'fetchDeleteMessages');
    spyOn(component, 'back');
    component.deleteMessage();
    expect(component.modalService.close).toHaveBeenCalled();
    expect(component['facade'].fetchDeleteMessages).toHaveBeenCalled();
    expect(component.back).toHaveBeenCalledWith('/mensajes');
  });
});
