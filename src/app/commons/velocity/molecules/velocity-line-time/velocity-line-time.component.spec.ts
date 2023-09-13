import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VelocityLineTimeComponent } from './velocity-line-time.component';

describe('VelocityLineTimeComponent', () => {
  let component: VelocityLineTimeComponent;
  let fixture: ComponentFixture<VelocityLineTimeComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [VelocityLineTimeComponent],
        imports: [IonicModule]
      }).compileComponents();

      fixture = TestBed.createComponent(VelocityLineTimeComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
