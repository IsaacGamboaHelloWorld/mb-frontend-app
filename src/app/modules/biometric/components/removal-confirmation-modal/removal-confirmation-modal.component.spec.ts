import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { RemovalConfirmationModalComponent } from './removal-confirmation-modal.component';
import { TestingModule } from '@test-helpers/testing.module';

describe('RemovalConfirmationModalComponent', () => {
  let component: RemovalConfirmationModalComponent;
  let fixture: ComponentFixture<RemovalConfirmationModalComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [RemovalConfirmationModalComponent],
        imports: [IonicModule, TestingModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(RemovalConfirmationModalComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
