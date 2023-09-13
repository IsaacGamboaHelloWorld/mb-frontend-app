import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { SaveDataTemplateService } from '@commons/velocity/templates/utils/services/save-data-template.service';
import { TestingModule } from '@test-helpers/testing.module';

describe('SaveDataTemplateService', () => {
  let service: SaveDataTemplateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [SaveDataTemplateService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    service = TestBed.inject(SaveDataTemplateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
