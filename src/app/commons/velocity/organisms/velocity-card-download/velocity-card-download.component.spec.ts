import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VelocityCardDownloadComponent } from './velocity-card-download.component';

describe('VelocityCardDownloadComponent', () => {
  let component: VelocityCardDownloadComponent;
  let fixture: ComponentFixture<VelocityCardDownloadComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [VelocityCardDownloadComponent],
        imports: [IonicModule]
      }).compileComponents();

      fixture = TestBed.createComponent(VelocityCardDownloadComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
