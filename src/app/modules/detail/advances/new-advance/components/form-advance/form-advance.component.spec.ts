import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { FormAdvanceComponent } from './form-advance.component';
import { TestingModule } from '@test-helpers/testing.module';
import { AdvancesFacade } from '@modules/detail/advances/new-advance/advances.facade';
import { AdvancesFacadeMock } from '@test-helpers/mocks/facade/advances.facade.mock';
import { MainContainerFacade } from '@modules/main-container/main-container.facade';
import { MainContainerFacadeMock } from '@test-helpers/mocks/facade/main-container.facade.mock';
import { Product } from '@commons/models/product.model';
import { ConfigTemplateService } from '@commons/velocity/templates/utils/services/config-template.service';

describe('FormAdvanceComponent', () => {
  let component: FormAdvanceComponent;
  let fixture: ComponentFixture<FormAdvanceComponent>;
  let service: ConfigTemplateService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FormAdvanceComponent],
        imports: [IonicModule, TestingModule],
        providers: [
          {
            provide: AdvancesFacade,
            useClass: AdvancesFacadeMock
          },
          {
            provide: MainContainerFacade,
            useClass: MainContainerFacadeMock
          },
          ConfigTemplateService
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(FormAdvanceComponent);
      component = fixture.componentInstance;

      service = TestBed.inject(ConfigTemplateService);
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get form values', () => {
    component.formAdvances.setValue({
      from: '',
      to: '',
      amount: '',
      description: '',
      expirationMonth: '10/10/10',
      expirationYear: '2010'
    });
    expect(component.expirationMonth.value).toEqual('10/10/10');
    expect(component.expirationYear.value).toEqual('2010');
  });

  it('should hiddenElement.el not be undefined', () => {
    component.changeAccount();
    expect(component.hiddenElement.el).not.toBe(null);
  });

  it('trackByTo return a string', () => {
    const product: Product = {
      id: 'dueDate',
      status: '',
      openedDate: '',
      closedDate: '',
      dueDate: 'test'
    };
    const trackBy = component.trackBy(0, product);
    expect(trackBy).toBeInstanceOf(String);
    expect(trackBy).toBe('test');
    expect(trackBy).not.toBeNaN();
  });
});
