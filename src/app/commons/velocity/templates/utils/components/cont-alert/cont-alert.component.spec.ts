import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { ConfigTemplateService } from '@commons/velocity/templates/utils/services/config-template.service';
import { ContAlertComponent } from './cont-alert.component';
import { TestingModule } from '@test-helpers/testing.module';

describe('ContAlertComponent', () => {
  let component: ContAlertComponent;
  let fixture: ComponentFixture<ContAlertComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ContAlertComponent],
        imports: [IonicModule, TestingModule],
        providers: [ConfigTemplateService],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(ContAlertComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate methods', () => {
    component.beforeUrl();
    expect(component.props).toBeUndefined();
  });
});
