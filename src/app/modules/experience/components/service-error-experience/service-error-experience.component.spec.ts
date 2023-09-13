import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { ServiceErrorExperienceComponent } from './service-error-experience.component';
import { TestingModule } from '@test-helpers/testing.module';
import { IonicModule } from '@ionic/angular';
import { ExperienceFacade } from '@modules/experience/experience.facade';
import { ExperienceFacadeMock } from '@test-helpers/mocks/facade/experience.facade.mock';
import { AuthService } from '@commons/services/auth/auth.service';
import { SecurityService } from '@commons/security/services/security.service';
import { Security } from '@commons/security/utils/security';

describe('ServiceErrorExperienceComponent', () => {
  let component: ServiceErrorExperienceComponent;
  let fixture: ComponentFixture<ServiceErrorExperienceComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ServiceErrorExperienceComponent],
        imports: [IonicModule, TestingModule],
        providers: [
          AuthService,
          SecurityService,
          Security,
          { provide: ExperienceFacade, useClass: ExperienceFacadeMock }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceErrorExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
