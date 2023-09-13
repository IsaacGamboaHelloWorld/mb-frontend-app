import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { VelocityDetailInfoComponent } from './velocity-detail-info.component';

describe('VelocityDetailInfoComponent', () => {
  let component: VelocityDetailInfoComponent;
  let fixture: ComponentFixture<VelocityDetailInfoComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [VelocityDetailInfoComponent],
        imports: [IonicModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(VelocityDetailInfoComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
