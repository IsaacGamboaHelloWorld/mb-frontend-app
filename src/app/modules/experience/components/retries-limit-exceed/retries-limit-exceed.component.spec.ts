import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { RetriesLimitExceedComponent } from './retries-limit-exceed.component';
import { TestingModule } from '@test-helpers/testing.module';

describe('RetriesLimitComponent', () => {
  let component: RetriesLimitExceedComponent;
  let fixture: ComponentFixture<RetriesLimitExceedComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [RetriesLimitExceedComponent],
        imports: [TestingModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(RetriesLimitExceedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
