import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { Platform } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { AppContainer } from './app.container';
import { SecurityService } from '@commons/security/services/security.service';
import { Security } from '@commons/security/utils/security';
import { TestingModule } from '@test-helpers/testing.module';

describe('AppComponent', () => {
  let statusBarSpy, splashScreenSpy, platformReadySpy, platformSpy;
  let component: AppContainer;
  let fixture: ComponentFixture<AppContainer>;

  beforeEach(
    waitForAsync(() => {
      statusBarSpy = jasmine.createSpyObj('StatusBar', ['setStyle']);
      splashScreenSpy = jasmine.createSpyObj('SplashScreen', ['hide']);
      platformReadySpy = Promise.resolve();
      platformSpy = jasmine.createSpyObj('Platform', {
        ready: platformReadySpy,
        is: ''
      });

      TestBed.configureTestingModule({
        imports: [
          TranslateModule.forRoot(),
          HttpClientTestingModule,
          TestingModule
        ],
        declarations: [AppContainer],
        providers: [
          { provide: StatusBar, useValue: statusBarSpy },
          { provide: SplashScreen, useValue: splashScreenSpy },
          { provide: Platform, useValue: platformSpy },
          SecurityService,
          Security
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(AppContainer);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should initialize the app', async () => {
    expect(platformSpy.ready).toHaveBeenCalled();
  });

  // TODO: add more tests!
});
