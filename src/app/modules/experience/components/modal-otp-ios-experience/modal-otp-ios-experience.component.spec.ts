import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { ModalOtpIosExperienceComponent } from './modal-otp-ios-experience.component';
import { TestingModule } from '@test-helpers/testing.module';

describe('ModalOtpIosExperienceComponent', () => {
  let component: ModalOtpIosExperienceComponent;
  let fixture: ComponentFixture<ModalOtpIosExperienceComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ModalOtpIosExperienceComponent],
        imports: [TestingModule, IonicModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalOtpIosExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
