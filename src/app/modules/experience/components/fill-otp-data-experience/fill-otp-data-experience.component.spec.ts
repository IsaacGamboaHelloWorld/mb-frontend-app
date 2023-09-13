import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { FillOtpDataExperienceComponent } from './fill-otp-data-experience.component';
import { TestingModule } from '@test-helpers/testing.module';
import { ExperienceFacade } from '../../experience.facade';
import { ExperienceFacadeMock } from '@test-helpers/mocks/facade/experience.facade.mock';
import { SecurityService } from '@commons/security/services/security.service';
import { Security } from '@commons/security/utils/security';

describe('FillOtpDataExperienceComponent', () => {
  let component: FillOtpDataExperienceComponent;
  let fixture: ComponentFixture<FillOtpDataExperienceComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FillOtpDataExperienceComponent],
        imports: [TestingModule, IonicModule],
        providers: [
          SecurityService,
          Security,
          {
            provide: ExperienceFacade,
            useClass: ExperienceFacadeMock
          }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FillOtpDataExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
