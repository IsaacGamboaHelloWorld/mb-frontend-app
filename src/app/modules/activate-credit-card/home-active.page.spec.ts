import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

import { HomeActivePage } from './home-active.page';
import { HomeActiveFacade } from '@modules/activate-credit-card/home-active.facade';
import { HomeActiveBlockFacadeMock } from '@test-helpers/mocks/facade/home-active-block.facade.mock';
import { TestingModule } from '@test-helpers/testing.module';
import { SaveDataTemplateService } from '@commons/velocity/templates/utils/services/save-data-template.service';
import { STATUS_BUTTONS } from '@commons/velocity/templates/utils/entities/config.entities';

describe('HomeActivePage', () => {
  let component: HomeActivePage;
  let fixture: ComponentFixture<HomeActivePage>;
  let injectedServiceTemplate: SaveDataTemplateService;
  let injectedHomeActivesFacade: HomeActiveFacade;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [HomeActivePage],
        imports: [IonicModule, TestingModule],
        providers: [
          {
            provide: HomeActiveFacade,
            useClass: HomeActiveBlockFacadeMock
          }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(HomeActivePage);
      injectedServiceTemplate = TestBed.inject(SaveDataTemplateService);
      injectedHomeActivesFacade = TestBed.inject(HomeActiveFacade);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    component.ionContent = {
      scrollToTop: () => {}
    } as any;
    expect(component).toBeTruthy();
  });

  it('should validate error activeCreditCard$', () => {
    component.ionContent = {
      scrollToTop: () => {}
    } as any;
    component.ionViewWillEnter();
    injectedServiceTemplate.setActionConfirm(true);
    expect(component.ionContent).toBeTruthy();
    injectedServiceTemplate.setActionButtons(STATUS_BUTTONS.secondary);
    component.ionViewDidLeave();
  });

  it('should validate complete activeCreditCard$', () => {
    injectedHomeActivesFacade.activeCreditCard$ = new BehaviorSubject({
      information: {
        approvalId: '',
        errorMessage: '',
        specificErrorMessage: '',
        details: {
          companyId: '',
          accountId: '12345677890',
          accountType: 'CREDIT_CARD'
        },
        success: true
      },
      loading: false,
      completed: true,
      error: false,
      errorMessage: ''
    });
    component.ionContent = {
      scrollToTop: () => {}
    } as any;

    injectedServiceTemplate.setActionButtons(STATUS_BUTTONS.primary);

    component.ionViewWillEnter();
    expect(component.ionContent).toBeTruthy();
  });
});
