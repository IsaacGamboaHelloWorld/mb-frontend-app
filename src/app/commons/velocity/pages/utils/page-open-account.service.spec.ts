import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { PageOpenAccountService } from './page-open-account.service';
import { TestingModule } from '@test-helpers/testing.module';

describe('PageOpenAccountService', () => {
  let service: PageOpenAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PageOpenAccountService],
      imports: [TestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    service = TestBed.inject(PageOpenAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set params', () => {
    service.params = { title: 'mockTitle', text: 'mockText' };
    expect(service.params.title).toEqual('mockTitle');
  });
});
