import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { ConfigTemplateService } from '@commons/velocity/templates/utils/services/config-template.service';
import { TestingModule } from '@test-helpers/testing.module';

describe('ConfigBasicService', () => {
  let service: ConfigTemplateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    service = TestBed.inject(ConfigTemplateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
