import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestingModule } from '@test-helpers/testing.module';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { OpenAccountCustomPage } from './open-account-custom.page';
import { AppFacade } from '@app/app.facade';
import { AppFacadeMock } from '@test-helpers/mocks/facade/app.facade.mock';

describe('OpenAccountCustomPage', () => {
  let component: OpenAccountCustomPage;
  let fixture: ComponentFixture<OpenAccountCustomPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [OpenAccountCustomPage],
        imports: [IonicModule, TestingModule],
        providers: [
          {
            provide: AppFacade,
            useClass: AppFacadeMock
          },
          {
            provide: InAppBrowser,
            useValue: { create: () => {} }
          }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(OpenAccountCustomPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate return params', () => {
    spyOn(window, 'open');
    component.back();
    component.openBrowser('/');
    component.openBrowser('/', false);
    expect(component.params).toBeFalsy();
    expect(window.open).toHaveBeenCalled();
  });
});
