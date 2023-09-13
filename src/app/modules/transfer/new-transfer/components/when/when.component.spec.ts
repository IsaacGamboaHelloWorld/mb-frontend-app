import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { WhenComponent } from '@modules/transfer/new-transfer/components/when/when.component';
import { TestingModule } from '@test-helpers/testing.module';
import { IConfigTemplate } from '@commons/velocity/templates/utils/entities/config.entities';

describe('WhenComponent', () => {
  let component: WhenComponent;
  let fixture: ComponentFixture<WhenComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [WhenComponent],
        imports: [IonicModule, TestingModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(WhenComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call saveDataTemplateService.saveDataTemplate', () => {
    component.formWhen.setValue({
      date: '00/00/0000',
      favorite: true
    });
    spyOn<any>(component['saveDataTemplateService'], 'saveDataTemplate');

    const config: IConfigTemplate = {
      beforeUrl: '',
      defaultUrl: '',
      toWho: null,
      router: [
        {
          url: '',
          step: 1
        },
        {
          url: '',
          step: 2
        },
        {
          url: '',
          step: 3
        },
        {
          url: '',
          step: 4
        }
      ],
      ionContent: null
    };
    component['configTemplate'].setConfig(config);
    component.submitForm();
    expect(
      component['saveDataTemplateService'].saveDataTemplate
    ).toHaveBeenCalled();
  });
});
