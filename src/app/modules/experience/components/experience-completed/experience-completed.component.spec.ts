import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { ExperienceCompletedComponent } from './experience-completed.component';
import { TestingModule } from '@test-helpers/testing.module';

describe('ExperienceCompletedComponent', () => {
  let component: ExperienceCompletedComponent;
  let fixture: ComponentFixture<ExperienceCompletedComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ExperienceCompletedComponent],
        imports: [TestingModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperienceCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
