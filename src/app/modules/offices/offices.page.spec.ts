import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { UrlSerializer } from '@angular/router';
import { IonicModule, NavController } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';

import { OfficesPage } from './offices.page';
import { TestingModule } from '@test-helpers/testing.module';
import { Subject } from 'rxjs';

describe('OfficesPage', () => {
  let component: OfficesPage;
  let fixture: ComponentFixture<OfficesPage>;

  let routerSpy = { navigateRoot: jasmine.createSpy('navigateRoot') };

  beforeEach(
    waitForAsync(() => {
      const geolocation = {
        getCurrentPosition: new Promise((resolve) => {
          resolve('foo');
        })
      };
      TestBed.configureTestingModule({
        declarations: [OfficesPage],
        imports: [IonicModule, TestingModule],
        providers: [
          { provide: Geolocation, useValue: geolocation },
          UrlSerializer,
          { provide: NavController, useValue: routerSpy }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(OfficesPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    Capacitor.getPlatform = jasmine.createSpy().and.returnValue('web');
    spyOn(component, 'getCurrentPosition');
    expect(component).toBeTruthy();
    expect(component.getCurrentPosition).not.toHaveBeenCalled();
  });

  it('should navigate to expected route', () => {
    component.back();
    expect(routerSpy.navigateRoot).toHaveBeenCalledWith(['']);
  });
});
