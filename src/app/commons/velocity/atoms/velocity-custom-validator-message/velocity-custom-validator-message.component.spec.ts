import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { VelocityCustomValidatorMessageComponent } from './velocity-custom-validator-message.component';

describe('VelocityCustomValidatorMessageComponent', () => {
  let component: VelocityCustomValidatorMessageComponent;
  let fixture: ComponentFixture<VelocityCustomValidatorMessageComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [VelocityCustomValidatorMessageComponent],
        imports: [IonicModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(
        VelocityCustomValidatorMessageComponent
      );
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
