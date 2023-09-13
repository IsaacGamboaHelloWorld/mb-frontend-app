import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';

import { FormStepComponent } from 'src/app/commons/velocity/templates/basic-template/components/form-step/form-step.component';
import { SaveDataTemplateService } from '@commons/velocity/templates/utils/services/save-data-template.service';
import { TestingModule } from '@test-helpers/testing.module';
import { InjectComponentDirective } from '@commons/velocity/templates/basic-template/directives/inject-component.directive';

describe('FormStepComponent', () => {
  let component: FormStepComponent;
  let fixture: ComponentFixture<FormStepComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FormStepComponent, InjectComponentDirective],
        imports: [IonicModule, TestingModule],
        providers: [NavController, SaveDataTemplateService],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(FormStepComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
