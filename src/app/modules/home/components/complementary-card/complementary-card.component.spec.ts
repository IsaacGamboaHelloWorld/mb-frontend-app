import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { TestingModule } from '@test-helpers/testing.module';
import { ComplementaryCardComponent } from './complementary-card.component';

describe('ComplementaryCardComponent', () => {
  let component: ComplementaryCardComponent;
  let fixture: ComponentFixture<ComplementaryCardComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ComplementaryCardComponent],
        imports: [IonicModule, TestingModule],
        schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplementaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
