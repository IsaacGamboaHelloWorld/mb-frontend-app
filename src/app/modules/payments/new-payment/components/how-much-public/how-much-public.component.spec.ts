import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { HowMuchPublicComponent } from './how-much-public.component';
import { TestingModule } from '@test-helpers/testing.module';
import { PaymentsFacade } from '@modules/payments/payments.facade';
import { PaymentFacadeMock } from '@test-helpers/mocks/facade/payment.facade.mock';
import { IConfigTemplate } from '@commons/velocity/templates/utils/entities/config.entities';
import { ISaveDataTemplate } from '@commons/velocity/templates/utils/entities/save.data.entities';

describe('HowMuchPublicComponent', () => {
  let component: HowMuchPublicComponent;
  let fixture: ComponentFixture<HowMuchPublicComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [HowMuchPublicComponent],
        imports: [IonicModule, TestingModule],
        providers: [
          {
            provide: PaymentsFacade,
            useClass: PaymentFacadeMock
          }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(HowMuchPublicComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ahould call saveDataTemplateService.saveDataTemplate', () => {
    component.formHowMuch.setValue({
      amount: '10000',
      reference: 'referenc'
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

  it('amountValue should be equal 20000', () => {
    const toWho: ISaveDataTemplate = {
      toWho: {
        to: {
          amount: 20000
        }
      },
      confirmation: '',
      success: '',
      stepActive: '',
      finish: true
    };
    component['saveDataTemplateService'].saveDataTemplate(toWho);
    spyOnProperty(component, 'isBiller', 'get').and.returnValue(true);
    expect(component.amountValue).toEqual(20000);
  });
});
