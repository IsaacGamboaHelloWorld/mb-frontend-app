import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { StepThreeComponent } from 'src/app/commons/velocity/templates/advance-template/components/step-three/step-three.component';
import { TestingModule } from '@test-helpers/testing.module';
import { SaveDataTemplateService } from '@commons/velocity/templates/utils/services/save-data-template.service';

describe('StepThreeComponent', () => {
  let component: StepThreeComponent;
  let fixture: ComponentFixture<StepThreeComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [StepThreeComponent],
        imports: [IonicModule, TestingModule],
        providers: [SaveDataTemplateService],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(StepThreeComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
