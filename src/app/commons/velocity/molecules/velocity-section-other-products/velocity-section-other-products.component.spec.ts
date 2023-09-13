import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VelocitySectionOtherProductsComponent } from './velocity-section-other-products.component';

describe('VelocitySectionOtherProductsComponent', () => {
  let component: VelocitySectionOtherProductsComponent;
  let fixture: ComponentFixture<VelocitySectionOtherProductsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [VelocitySectionOtherProductsComponent],
        imports: [IonicModule]
      }).compileComponents();

      fixture = TestBed.createComponent(VelocitySectionOtherProductsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
