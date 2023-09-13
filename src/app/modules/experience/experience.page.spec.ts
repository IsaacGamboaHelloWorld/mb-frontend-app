import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { ExperiencePage } from './experience.page';
import { TestingModule } from '@test-helpers/testing.module';
import { ExperienceFacade } from './experience.facade';
import { ExperienceFacadeMock } from '@test-helpers/mocks/facade/experience.facade.mock';
import { SecurityService } from '@commons/security/services/security.service';
import { ModalService } from '@commons/services/modal.service';
import { Security } from '@commons/security/utils/security';

describe('ExperiencePage', () => {
  let component: ExperiencePage;
  let fixture: ComponentFixture<ExperiencePage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ExperiencePage],
        imports: [IonicModule, TestingModule],
        providers: [
          SecurityService,
          Security,
          ModalService,
          { provide: ExperienceFacade, useClass: ExperienceFacadeMock }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(ExperiencePage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
