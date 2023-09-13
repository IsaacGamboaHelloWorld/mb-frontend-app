import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VelocityErrorAndEmptyComponent } from './velocity-error-and-empty.component';

describe('VelocityErrorAndEmptyComponent', () => {
  let component: VelocityErrorAndEmptyComponent;
  let fixture: ComponentFixture<VelocityErrorAndEmptyComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [VelocityErrorAndEmptyComponent],
        imports: [IonicModule]
      }).compileComponents();

      fixture = TestBed.createComponent(VelocityErrorAndEmptyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
