import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';

import { TestingModule } from '@test-helpers/testing.module';
import { StepGuard } from '@commons/velocity/templates/utils/guards/step.guard';
import { SaveDataTemplateService } from '@commons/velocity/templates/utils/services/save-data-template.service';

describe('StepGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      providers: [StepGuard, SaveDataTemplateService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
  });

  it('should ...', inject(
    [StepGuard, SaveDataTemplateService],
    (guard: StepGuard, step: SaveDataTemplateService) => {
      guard.canActivate().subscribe();
      expect(guard).toBeTruthy();
    }
  ));
});
