import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { StepTwoComponent } from 'src/app/commons/velocity/templates/advance-template/components/step-two/step-two.component';
import { SaveDataTemplateService } from '@commons/velocity/templates/utils/services/save-data-template.service';
import { TestingModule } from '@test-helpers/testing.module';

describe('StepTwoComponent', () => {
  let component: StepTwoComponent;
  let fixture: ComponentFixture<StepTwoComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [StepTwoComponent],
        imports: [IonicModule, TestingModule],
        providers: [SaveDataTemplateService],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(StepTwoComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
