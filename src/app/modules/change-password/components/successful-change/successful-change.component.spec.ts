import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { SuccessfulChangeComponent } from './successful-change.component';
import { TestingModule } from '@test-helpers/testing.module';
import { ChangePasswordFacade } from '@modules/change-password/change-password.facade';
import { ChangePasswordFacadeMock } from '@test-helpers/mocks/facade/change-password.facade.mock';
import { Security } from '@commons/security/utils/security';

describe('SuccessfulChangeComponent', () => {
  let component: SuccessfulChangeComponent;
  let fixture: ComponentFixture<SuccessfulChangeComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SuccessfulChangeComponent],
        imports: [IonicModule, TestingModule],
        providers: [
          Security,
          {
            provide: ChangePasswordFacade,
            useClass: ChangePasswordFacadeMock
          }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(SuccessfulChangeComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    component.redirect();
    expect(component).toBeTruthy();
  });
});
