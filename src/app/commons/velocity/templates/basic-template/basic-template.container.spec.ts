import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';

import { BasicTemplateContainer } from 'src/app/commons/velocity/templates/basic-template/basic-template.container';
import { TestingModule } from '@test-helpers/testing.module';

describe('BasicTemplate.ContainerComponent', () => {
  let component: BasicTemplateContainer;
  let fixture: ComponentFixture<BasicTemplateContainer>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [BasicTemplateContainer],
        imports: [IonicModule, TestingModule],
        providers: [NavController],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(BasicTemplateContainer);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
