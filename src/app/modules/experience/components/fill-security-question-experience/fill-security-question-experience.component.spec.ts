import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TestingModule } from '@test-helpers/testing.module';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { FillSecurityQuestionComponent } from './fill-security-question-experience.component';
import { ModalService } from '@commons/services/modal.service';
import { ExperienceFacade } from '../../experience.facade';
import { ExperienceFacadeMock } from '@test-helpers/mocks/facade/experience.facade.mock';
import { SecurityService } from '@commons/security/services/security.service';
import { Security } from '@commons/security/utils/security';

describe('FillSecurityQuestionComponent', () => {
  let component: FillSecurityQuestionComponent;
  let fixture: ComponentFixture<FillSecurityQuestionComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FillSecurityQuestionComponent],
        imports: [TestingModule, IonicModule],
        providers: [
          ModalService,
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
    fixture = TestBed.createComponent(FillSecurityQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
