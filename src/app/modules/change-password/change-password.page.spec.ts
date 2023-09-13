import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { NavController } from '@ionic/angular';

import { ChangePasswordPage } from './change-password.page';
import { TestingModule } from '@test-helpers/testing.module';
import { ChangePasswordFacade } from '@modules/change-password/change-password.facade';
import { ChangePasswordFacadeMock } from '@test-helpers/mocks/facade/change-password.facade.mock';

describe('ChangePasswordPage', () => {
  let component: ChangePasswordPage;
  let fixture: ComponentFixture<ChangePasswordPage>;

  let routerSpy = { navigateRoot: jasmine.createSpy('navigateRoot') };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ChangePasswordPage],
        imports: [IonicModule, TestingModule],
        providers: [
          {
            provide: ChangePasswordFacade,
            useClass: ChangePasswordFacadeMock
          },
          { provide: NavController, useValue: routerSpy }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(ChangePasswordPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call facade.resetChangePassword', () => {
    spyOn<any>(component['facade'], 'resetChangePassword');
    component.ionViewDidLeave();
    expect(component['facade'].resetChangePassword).toHaveBeenCalled();
  });

  it('should navigate to expect route close()', () => {
    component.close();
    expect(routerSpy.navigateRoot).toHaveBeenCalledWith(['']);
  });

  it('value of observable should be false', (done: DoneFn) => {
    component.isComplete$.subscribe((resp) => {
      expect(resp).toEqual(false);
      done();
    });
  });
});
