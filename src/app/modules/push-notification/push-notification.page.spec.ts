import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { PushNotificationPage } from './push-notification.page';
import { PushNotificationFacade } from '@modules/push-notification/push-notification.facade';
import { PushNotificationFacadeMock } from '@test-helpers/mocks/facade/push-notification.facade.mock';
import { TestingModule } from '@test-helpers/testing.module';
import { ModalService } from '@commons/services/modal.service';

describe('PushNotificationPage', () => {
  let component: PushNotificationPage;
  let fixture: ComponentFixture<PushNotificationPage>;
  let navService: NavController;
  let modalService: ModalService;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PushNotificationPage],
        imports: [IonicModule, TestingModule],
        providers: [
          NavController,
          ModalService,
          {
            provide: PushNotificationFacade,
            useClass: PushNotificationFacadeMock
          }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(PushNotificationPage);
      component = fixture.componentInstance;
      navService = fixture.debugElement.injector.get(NavController);
      modalService = fixture.debugElement.injector.get(ModalService);
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('ionViewWillEnter should work correctly ', () => {
    const spyValidateKey = spyOn(component as any, '_validateKey');
    const spyWatchEvents = spyOn(component as any, '_watchEvents');
    component.ionViewWillEnter();
    fixture.detectChanges();
    expect(spyValidateKey).toHaveBeenCalled();
    expect(spyWatchEvents).toHaveBeenCalled();
  });
  it('ionViewDidLeave should work correctly ', () => {
    const subsTest = [new Subscription(), new Subscription()];
    component['_subs'] = subsTest;
    component.ionViewDidLeave();
    expect(component['_subs']).not.toBeNaN();
  });
  it('back should work correctly ', () => {
    const spy = spyOn(navService, 'navigateForward').and.callFake(() => null);
    component.back();
    expect(spy).toHaveBeenCalled();
  });
  it('toggleCheck should work correctly with true parameter ', () => {
    const spy = spyOn(modalService, 'openModal').and.callFake(() => null);
    component.toggleCheck(true);
    expect(spy).toHaveBeenCalled();
  });
});
