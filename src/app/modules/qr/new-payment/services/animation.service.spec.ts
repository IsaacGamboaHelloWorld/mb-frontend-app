import { TestBed } from '@angular/core/testing';

import { AnimationService } from './animation.service';

describe('AnimationService', () => {
  let service: AnimationService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [AnimationService] });
    service = TestBed.inject(AnimationService);
  });

  it('should be created', () => {
    service.setActionClick();
    service.setShowShadow(true);
    expect(service).toBeTruthy();
  });
});
