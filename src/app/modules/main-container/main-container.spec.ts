import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NgIdleModule } from '@ng-idle/core';
import { TranslateService } from '@ngx-translate/core';
import { Idle } from '@ng-idle/core';
import { of } from 'rxjs';

import { MainContainer } from 'src/app/modules/main-container/main-container';
import { TestingModule } from '@test-helpers/testing.module';
import { MainContainerFacade } from '@modules/main-container/main-container.facade';
import { MainContainerFacadeMock } from '@test-helpers/mocks/facade/main-container.facade.mock';
import { ModalService } from '@commons/services/modal.service';
import { AuthSessionService } from '@commons/services/auth/auth-session.service';
import { Security } from '@commons/security/utils/security';
import { SecurityService } from '@commons/security/services/security.service';

describe('MainContainerComponent', () => {
  let component: MainContainer;
  let fixture: ComponentFixture<MainContainer>;

  class idleMock {
    setIdle(value: number) {}
    setTimeout(value: number) {}
    setInterrupts(value: any) {}
    watch() {}
    onTimeout = of(1);
  }

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MainContainer],
        imports: [IonicModule, TestingModule, NgIdleModule.forRoot()],
        providers: [
          {
            provide: MainContainerFacade,
            useClass: MainContainerFacadeMock
          },
          {
            provide: Idle,
            useClass: idleMock
          },
          TranslateService,
          ModalService,
          AuthSessionService,
          Security,
          SecurityService
        ],
        schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(MainContainer);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    component.ionViewWillEnter();
    expect(component).toBeTruthy();
  });

  it('should call next ionViewDidLeave()', () => {
    spyOn<any>(component['_destroy$'], 'next');
    component.ionViewDidLeave();
    expect(component['_destroy$'].next).toHaveBeenCalled();
  });

  it('should call _logout()', () => {
    spyOn<any>(component, '_logout');
    component['_startIdle']();
    component.ionViewDidLeave();
    expect(component['_logout']).toHaveBeenCalled();
  });
});
