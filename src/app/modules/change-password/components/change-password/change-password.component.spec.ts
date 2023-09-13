import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { ChangePasswordComponent } from './change-password.component';
import { TestingModule } from '@test-helpers/testing.module';
import { ChangePasswordFacade } from '@modules/change-password/change-password.facade';
import { ChangePasswordFacadeMock } from '@test-helpers/mocks/facade/change-password.facade.mock';
import { ChangePasswordService } from '@modules/change-password/services/change-password.service';

describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ChangePasswordComponent],
        imports: [IonicModule, TestingModule],
        providers: [
          ChangePasswordService,
          {
            provide: ChangePasswordFacade,
            useClass: ChangePasswordFacadeMock
          }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(ChangePasswordComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
