import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ServiceErrorComponent } from './service-error.component';
import { TestingModule } from '@test-helpers/testing.module';

describe('ServiceErrorComponent', () => {
  let component: ServiceErrorComponent;
  let fixture: ComponentFixture<ServiceErrorComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ServiceErrorComponent],
        imports: [IonicModule, TestingModule]
      }).compileComponents();

      fixture = TestBed.createComponent(ServiceErrorComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
