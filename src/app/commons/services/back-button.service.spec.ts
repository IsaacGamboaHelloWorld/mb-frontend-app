import { TestBed } from '@angular/core/testing';

import { BackButtonService } from './back-button.service';
import { TestingModule } from '@test-helpers/testing.module';

describe('BackButtonService', () => {
  let service: BackButtonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [BackButtonService]
    });
    service = TestBed.inject(BackButtonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
