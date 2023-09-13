import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VelocityCardLoanComponent } from './velocity-card-loan.component';
import { FormBuilder, FormControl } from '@angular/forms';

const fb = new FormBuilder();

describe('VelocityCardLoanComponent', () => {
  let component: VelocityCardLoanComponent;
  let fixture: ComponentFixture<VelocityCardLoanComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [VelocityCardLoanComponent],
        imports: [IonicModule]
      }).compileComponents();

      fixture = TestBed.createComponent(VelocityCardLoanComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate value', () => {
    component.value = 'text';
    const form = fb.group({
      name: ['text']
    });
    component.control = form.get('name') as FormControl;
    component.setValue();
  });
});
