import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { HowMuchComponent } from '@modules/transfer/new-transfer/components/how-much/how-much.component';
import { TestingModule } from '@test-helpers/testing.module';

describe('HowMuchComponent on new-transfer', () => {
  let component: HowMuchComponent;
  let fixture: ComponentFixture<HowMuchComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [HowMuchComponent],
        imports: [IonicModule, TestingModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(HowMuchComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call configTemplate.changeStep', () => {
    component.formHowMuch.setValue({
      amount: 10000,
      description: 'arriendo',
      voucherId: ''
    });
    spyOn<any>(component['configTemplate'], 'changeStep');
    component.submitForm();
    expect(component['configTemplate'].changeStep).toHaveBeenCalled();
  });
});
