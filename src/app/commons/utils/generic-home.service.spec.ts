import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TestingModule } from '@test-helpers/testing.module';

import { GenericHomeService } from './generic-home.service';

describe('GenericHomeService', () => {
  let service: GenericHomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GenericHomeService],
      imports: [TestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    service = TestBed.inject(GenericHomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('hould return items value', () => {
    service['_items'] = {
      type: 'card',
      title: 'titleMock',
      items: [
        {
          title: 'titleMock',
          description: 'descriptionMock',
          path: 'pathMock',
          enable: false
        }
      ]
    };
    expect(service.items.title).toEqual('titleMock');
  });
});
