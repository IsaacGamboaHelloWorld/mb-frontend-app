import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { Observable, of } from 'rxjs';

import { OptionRedemptionComponent } from './option-redemption.component';
import { TestingModule } from '@test-helpers/testing.module';
import { TuplusFacade } from '@modules/tuplus/tuplus.facade';
import { TuplusFacadeMock } from '@test-helpers/mocks/facade/tuplus.facade.mock';
import { ModalService } from '@commons/services/modal.service';

describe('OptionRedemptionComponent', () => {
  let component: OptionRedemptionComponent;
  let fixture: ComponentFixture<OptionRedemptionComponent>;
  let injectedFacade: TuplusFacade;
  let modal: ModalService;
  let navCtrl: NavController;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [OptionRedemptionComponent],
        imports: [IonicModule, TestingModule],
        providers: [
          {
            provide: TuplusFacade,
            useClass: TuplusFacadeMock
          },
          {
            provide: NavController
          }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();
      fixture = TestBed.createComponent(OptionRedemptionComponent);
      component = fixture.componentInstance;
      injectedFacade = TestBed.inject(TuplusFacade);
      navCtrl = TestBed.inject(NavController);
      fixture.detectChanges();
      modal = fixture.debugElement.injector.get(ModalService);
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('validate openModalBeneficios', () => {
    const spy1 = spyOn(modal, 'openModal').and.callFake(() => null);
    component.openModalBeneficios();
    expect(spy1).toHaveBeenCalled();
  });

  it('should ionViewDidLeave', (done: DoneFn) => {
    let observer1$: Observable<any> = of({});
    let observer2$: Observable<any> = of({});
    component['_tuplusPoints'] = observer1$.subscribe(() => {
      null;
      done();
    });
    component['_configuration'] = observer2$.subscribe(() => {
      null;
      done();
    });
    const spy1 = spyOn(component['_tuplusPoints'], 'unsubscribe').and.callFake(
      () => {
        null;
        done();
      }
    );
    const spy2 = spyOn(component['_configuration'], 'unsubscribe').and.callFake(
      () => {
        null;
        done();
      }
    );
    component.ionViewDidLeave();
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

  it('should redeemCard', () => {
    const dataTest = {
      icon: 'icon-vel-money-coins',
      title: 'TUPLUS.OPTION_TO_REDEEM.MONEY',
      content: 'TUPLUS.OPTION_TO_REDEEM.PAY_ACCOUNT_TEXT',
      id: 1
    };
    const resp = component.redeemCard;
    expect(resp).toEqual(dataTest);
  });

  it('should benefitsCard', () => {
    const dataTest = {
      icon: 'icon-vel-benefits',
      title: 'TUPLUS.OPTION_TO_REDEEM.BENEFITS',
      content: 'TUPLUS.OPTION_TO_REDEEM.BENEFITS_TEXT',
      id: 2
    };
    const resp = component.benefitsCard;
    expect(resp).toEqual(dataTest);
  });

  it('should isLoadingConfiguration', () => {
    injectedFacade.conversionFactor$ = of({
      information: null,
      loading: true,
      completed: false,
      error: false,
      errorMessage: ''
    });
    const resp = component.isLoadingConfiguration$;
    expect(resp).toBeTruthy();
  });

  it('should validateStatusConfiguration', () => {
    injectedFacade.conversionFactor$ = of({
      information: null,
      loading: false,
      completed: false,
      error: true,
      errorMessage: ''
    });
    const resp = component.validateStatusConfiguration(1);
    expect(resp).toBeTruthy();
  });

  it('should totalPointsTuplus', () => {
    injectedFacade.tuplusBalance$ = of({
      information: { success: true, status: '', totalPoints: 2, points: null },
      errorMessage: '',
      loading: false,
      completed: true,
      error: false
    });
    component.totalPointsTuplus();
    expect(component['_totalPoints']).toEqual(2);
  });

  it('should validateOnTypeCard === true', () => {
    const spy1 = spyOn(component, 'totalPointsTuplus').and.callFake(() => null);
    const spy2 = spyOn(component, 'validatePointsTuplus').and.callFake(
      () => null
    );
    component.validateOnTypeCard(1);
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

  it('should validateOnTypeCard === false', () => {
    const spy1 = spyOn(component, 'totalPointsTuplus').and.callFake(() => null);
    const spy2 = spyOn(component, 'openModalBeneficios').and.callFake(
      () => null
    );
    component.validateOnTypeCard(2);
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

  it('should validatePointsTuplus _errorConfiguration === true', () => {
    component['_errorConfiguration'] = true;
    const resp = component.validatePointsTuplus();
    expect(resp).toBeUndefined();
  });

  it('should validatePointsTuplus _totalPoints < 2000', () => {
    component['_totalPoints'] = 1;
    const spy1 = spyOn(component, 'toastValidatePoints').and.callFake(
      () => null
    );
    component.validatePointsTuplus();
    expect(spy1).toHaveBeenCalled();
  });

  it('should validatePointsTuplus _totalPoints > 2000', () => {
    component['_totalPoints'] = 2001;
    const spy1 = spyOn(navCtrl, 'navigateForward').and.callFake(() => null);
    component.validatePointsTuplus();
    expect(spy1).toHaveBeenCalled();
  });

  it('should openBrowser', () => {
    const spy1 = spyOn(injectedFacade, 'logout').and.callFake(() => null);
    component.openBrowser();
    expect(spy1).toHaveBeenCalled();
  });

  it('should back', () => {
    component['_beforeRoute'] = '/tuplus/donde-redimir';
    component['_originRoute'] = '/';
    const spy1 = spyOn(navCtrl, 'navigateBack').and.callFake(() => null);
    const spy2 = spyOn(injectedFacade, 'resetSourcePath').and.callFake(
      () => null
    );
    component.back();
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

  it('should toastValidatePoints', () => {
    const spy1 = spyOn(injectedFacade, 'openToast').and.callFake(() => null);
    component.toastValidatePoints();
    expect(spy1).toHaveBeenCalled();
  });

  it('should openModalBeneficios', () => {
    const spy1 = spyOn(modal, 'openModal').and.callFake(() => null);
    component.openModalBeneficios();
    expect(spy1).toHaveBeenCalled();
  });
});
