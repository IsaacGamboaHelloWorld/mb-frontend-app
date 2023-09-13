import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VelocityToastComponent } from './velocity-toast.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('VelocityToastComponent', () => {
  let component: VelocityToastComponent;
  let fixture: ComponentFixture<VelocityToastComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [VelocityToastComponent],
        imports: [IonicModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(VelocityToastComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
