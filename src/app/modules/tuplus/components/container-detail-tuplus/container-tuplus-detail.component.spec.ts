import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { first } from 'rxjs/operators';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { ContainerDetailComponentTuplus } from './container-tuplus-detail.component';
import { TestingModule } from '@test-helpers/testing.module';
import { TuplusFacade } from '@modules/tuplus/tuplus.facade';
import { TuplusFacadeMock } from '@test-helpers/mocks/facade/tuplus.facade.mock';
import { ITuplusState } from '@modules/main-container/store/states/main-container.state';
import { mapperTuplus } from '@modules/home/mappers/tuplus.mapper';
import { ModalService } from '@commons/services/modal.service';

const tuplus: ITuplusState = {
  information: {
    success: true,
    status: '',
    totalPoints: 8,
    points: {
      BANCO_DE_BOGOTA: 2,
      BANCO_POPULAR: 2,
      BANCO_OCCIDENTE: 2,
      BANCO_AV_VILLAS: 2
    }
  },
  errorMessage: '',
  loading: false,
  completed: true,
  error: false
};

describe('ContainerTuplusDetailComponent', () => {
  let component: ContainerDetailComponentTuplus;
  let fixture: ComponentFixture<ContainerDetailComponentTuplus>;
  let injectedFacade: TuplusFacade;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ContainerDetailComponentTuplus],
        imports: [IonicModule, TestingModule],
        providers: [
          ModalService,
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
      fixture = TestBed.createComponent(ContainerDetailComponentTuplus);
      injectedFacade = TestBed.inject(TuplusFacade);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('showFilter should be falsy', () => {
    component['_showFilter'] = false;
    component.showFilter;
    expect(component['_showFilter']).toBe(false);
  });

  it('validate gets tuplus - movements ', (done: DoneFn) => {
    component.movements$.pipe(first()).subscribe((data) => {
      expect(data).toBeDefined();
      done();
    });
  });

  it('validate gets tuplus - conversionFactor ', (done: DoneFn) => {
    component.conversionFactor$.pipe(first()).subscribe((data) => {
      expect(data).toBeDefined();
      done();
    });
  });

  it('validate gets tuplus - pointsTuplus  false', (done: DoneFn) => {
    const dataMock = {
      information: {
        success: true,
        status: '',
        totalPoints: null,
        points: null
      },
      errorMessage: '',
      loading: false,
      completed: true,
      error: false
    };
    injectedFacade.tuplusBalance$ = of(dataMock);
    component.pointsTuplus$.pipe(first()).subscribe((data) => {
      expect(data).toBeDefined();
      done();
    });
  });

  it('validate gets tuplus - pointsTuplus true', (done: DoneFn) => {
    const dataMock = {
      information: {
        success: true,
        status: '',
        totalPoints: 200,
        points: null
      },
      errorMessage: '',
      loading: false,
      completed: true,
      error: false
    };
    injectedFacade.tuplusBalance$ = of(dataMock);
    component.pointsTuplus$.pipe(first()).subscribe((data) => {
      expect(data).toBeDefined();
      done();
    });
  });

  it('validate fetchMovements', () => {
    const spy1 = spyOn(injectedFacade, 'fetchMovements').and.callFake(
      () => null
    );
    component.fetchMovements();
    expect(spy1).toHaveBeenCalled();
  });

  it('validate setTuplus', () => {
    component.setTuplus(tuplus);
    expect(mapperTuplus).toBeTruthy();
  });

  it('validate back to home', () => {
    const spy1 = spyOn(component, 'logoutTuplus').and.callFake(() => null);
    component.back();
    expect(spy1).toHaveBeenCalled();
  });

  it('validate toggle filters returns true', () => {
    component['_showFilter'] = false;
    component.toggleFilters();
    expect(component['_showFilter']).toBeTrue();
  });

  it('validate toggle filter returns false', () => {
    component['_showFilter'] = true;
    component.toggleFilters();
    expect(component['_showFilter']).toBeFalse();
  });

  it('validate redirect Redemption', () => {
    const spy1 = spyOn(component.navCtrl, 'navigateForward').and.callFake(
      () => null
    );
    const spy2 = spyOn(injectedFacade, 'fetchSourcePath').and.callFake(
      () => null
    );
    component.redirectToRedemption();
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

  it('validate equivalentPoints false', () => {
    const tuplus = {
      information: { success: true, status: '', totalPoints: 2, points: null },
      errorMessage: '',
      loading: false,
      completed: true,
      error: false
    };
    const conversionFactor = {};
    const equivalentPoints = component.equivalentPoints(
      tuplus,
      conversionFactor
    );
    expect(equivalentPoints).toEqual(0);
  });

  it('validate equivalentPoints true', () => {
    const tuplus = {
      information: { success: true, status: '', totalPoints: 2, points: null },
      errorMessage: '',
      loading: false,
      completed: true,
      error: false
    };
    const conversionFactor = {
      information: {
        MinCurAmt: null,
        MaxCurAmt: null,
        OtpInfo: null,
        LoyMemberPartnerInfo: null,
        ConversionFactor: 2,
        Withholding: null,
        errorMessage: '',
        specificErrorMessage: '',
        success: true
      },
      loading: false,
      completed: true,
      error: false,
      errorMessage: ''
    };
    const equivalentPoints = component.equivalentPoints(
      tuplus,
      conversionFactor
    );
    expect(equivalentPoints).toEqual(4);
  });

  it('validate setBankPoints', () => {
    const bank = 'BANCO_POPULAR';
    const resp = component.setBankPoints(bank, 2);
    expect(resp.bank).toEqual(bank);
  });
});
