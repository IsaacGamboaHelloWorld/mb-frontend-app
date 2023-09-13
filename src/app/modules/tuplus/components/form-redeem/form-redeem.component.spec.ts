import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

import { TestingModule } from '@test-helpers/testing.module';
import { TuplusFacade } from '@modules/tuplus/tuplus.facade';
import { FormRedeemComponent } from '@modules/tuplus/components/form-redeem/form-redeem.component';
import { TuplusFacadeMock } from '@test-helpers/mocks/facade/tuplus.facade.mock';
import { ModalService } from '@commons/services/modal.service';

const conversionFactor = {
  information: {
    MinCurAmt: { Amt: 2 },
    MaxCurAmt: { Amt: 2 },
    OtpInfo: { OtpValue: '', OtpRequired: true, MinCurAmt: { Amt: 2 } },
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

describe('Form Redeem Component', () => {
  let component: FormRedeemComponent;
  let fixture: ComponentFixture<FormRedeemComponent>;
  let injectedFacade: TuplusFacade;
  let modal: ModalService;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FormRedeemComponent],
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

      fixture = TestBed.createComponent(FormRedeemComponent);
      injectedFacade = TestBed.inject(TuplusFacade);
      component = fixture.componentInstance;
      fixture.detectChanges();
      modal = fixture.debugElement.injector.get(ModalService);
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('isLoadingGenerateOtp should return an observable', (done: DoneFn) => {
    injectedFacade.generateOtp$ = of({
      information: null,
      loading: true,
      completed: false,
      error: false,
      errorMessage: ''
    });
    component.isLoadingGenerateOtp$.subscribe((data) => {
      expect(data).toEqual(true);
      done();
    });
  });

  it('isLoadingRedeemService return an observable', (done: DoneFn) => {
    injectedFacade.redeemPoints$ = of({
      information: null,
      loading: true,
      completed: false,
      error: false,
      errorRetry: false,
      errorMessage: '',
      errorCode: 0
    });
    component.isLoadingRedeemService$.subscribe((data) => {
      expect(data).toEqual(true);
      done();
    });
  });

  it('tuplusTotalPoints return an observable', (done: DoneFn) => {
    injectedFacade.tuplusBalance$ = of({
      information: { success: true, status: '', totalPoints: 2, points: null },
      errorMessage: '',
      loading: false,
      completed: true,
      error: false
    });
    component.tuplusTotalPoints$.subscribe((data) => {
      expect(data).toEqual(2);
      done();
    });
  });

  it('enableCreditCards return an Product[]', () => {
    component['_creditCards'] = [{ id: '539817' }];
    const resp = component.enableCreditCards;
    expect(resp).toEqual([{ id: '539817' }]);
  });

  it('redeemPointsResult return an observable', (done: DoneFn) => {
    const dataRedeemPoints = {
      information: null,
      loading: true,
      completed: false,
      error: false,
      errorRetry: false,
      errorMessage: '',
      errorCode: 0
    };
    injectedFacade.redeemPoints$ = of(dataRedeemPoints);
    component.redeemPointsResult$.subscribe((data) => {
      expect(data).toEqual(dataRedeemPoints);
      done();
    });
  });

  it('should return where field', () => {
    const where = component.formWhereToRedeem?.get('where');
    expect(component.where).toEqual(where);
  });

  it('should return deposit field', () => {
    component.ngOnInit();
    const deposit = component.formWhereToRedeem?.get('deposit');
    expect(component.deposit).toEqual(deposit);
  });

  it('should return credit field', () => {
    component.ngOnInit();
    const credit = component.formWhereToRedeem?.get('credit');
    expect(component.credit).toEqual(credit);
  });

  it('should return creditControl field', () => {
    component.ngOnInit();
    const credit = component.formWhereToRedeem?.get('credit');
    expect(component.creditControl).toEqual(credit);
  });

  it('validate fetchRedeem', () => {
    const spy1 = spyOn(injectedFacade, 'fetchRedeem').and.callFake(() => null);
    component.dispatchRedeem();
    expect(spy1).toHaveBeenCalled();
  });

  it('submit generate', () => {
    const spy1 = spyOn(injectedFacade, 'fetchGenerateOtp').and.callFake(
      () => null
    );
    component['_amtEquivalent'] = 2;
    component['_equivalent'] = 3;
    component['_otpRequired'] = true;
    component.submitGenerated();
    expect(spy1).toHaveBeenCalled();
  });
  it('submit generate call triggerRedeem', () => {
    const spy1 = spyOn(component, 'dispatchRedeem').and.callFake(() => null);
    component['_amtEquivalent'] = 3;
    component['_equivalent'] = 2;
    component['_otpRequired'] = false;
    component.submitGenerated();
    expect(spy1).toHaveBeenCalled();
  });

  it('openErrorModal', () => {
    const spy1 = spyOn(modal, 'openModal').and.callFake(() => null);
    component.openErrorModal();
    expect(spy1).toHaveBeenCalled();
  });

  it('openDepositSuccessModal', () => {
    const spy1 = spyOn(modal, 'openModal').and.callFake(() => null);
    component.openDepositSuccessModal();
    expect(spy1).toHaveBeenCalled();
  });

  it('should equivalentPoints', () => {
    component['_factor'] = 5;
    component.formWhereToRedeem.controls['points'].setValue(5);
    component.equivalentPoints();
    expect(component['_equivalent']).toEqual(25);
  });

  it('should changeAccount', () => {
    const resp = component.changeAccount('<div>hidde</div>');
    expect(resp).toBeUndefined();
  });

  it('should submitGenerate else', () => {
    const spy1 = spyOn(component, 'dispatchRedeem').and.callFake(() => null);
    component.submitGenerated();
    expect(spy1).toHaveBeenCalled();
  });

  it('should hasCreditCard', () => {
    component['_creditCards'] = [{ id: '539817' }];
    const resp = component.hasCreditCard;
    expect(resp).toBeTruthy();
  });

  it('should depositAccountSelected true', () => {
    component.formWhereToRedeem.controls['where'].setValue('DAC');
    const resp = component.depositAccountSelected;
    expect(resp).toEqual(true);
  });

  it('should productActive', () => {
    const resp = component.productActive;
    expect(resp).toBeDefined();
  });

  it('should amountEquivalent', () => {
    injectedFacade.conversionFactor$ = of(conversionFactor);
    expect(component.amountEquivalent()).toBeDefined();
  });

  it('should otpRequeridedTuplus', () => {
    injectedFacade.conversionFactor$ = of(conversionFactor);
    expect(component.otpRequeridedTuplus()).toBeDefined();
  });

  it('should factorConversionTuplus', () => {
    injectedFacade.conversionFactor$ = of(conversionFactor);
    expect(component.factorConversionTuplus()).toBeDefined();
  });

  it('should pointLimits', () => {
    injectedFacade.conversionFactor$ = of(conversionFactor);
    expect(component.pointLimits()).toBeDefined();
  });

  it('should limitPointsMessage', () => {
    component['_maxPoints'] = conversionFactor.information.MaxCurAmt.Amt;
    component['_minPoints'] = conversionFactor.information.MinCurAmt.Amt;
    const resp = component.limitPointsMessage();
    expect(resp).toBeDefined();
  });

  it('should trackBy', () => {
    const resp = component.trackBy(0, {});
    expect(resp).toBeUndefined();
  });

  it('should openOtpScreen _openOtp === true', () => {
    injectedFacade.generateOtp$ = of({
      information: null,
      loading: false,
      completed: true,
      error: false,
      errorMessage: ''
    });
    component.openOtpScreen();
    expect(component['_openOtp']).toBeTruthy();
  });

  it('should openOtpScreen _retryLimit  === true', () => {
    injectedFacade.generateOtp$ = of({
      information: null,
      loading: false,
      completed: false,
      error: true,
      errorMessage: ''
    });
    component.openOtpScreen();
    expect(component['_retryLimit']).toBeTruthy();
  });

  it('should validateOpenModal  completed === true', () => {
    const spy1 = spyOn(component, 'openDepositSuccessModal').and.callFake(
      () => null
    );

    injectedFacade.redeemPoints$ = of({
      information: null,
      loading: false,
      completed: true,
      error: false,
      errorRetry: false,
      errorMessage: '',
      errorCode: 0
    });

    component.validateOpenModal();
    expect(spy1).toHaveBeenCalled();
  });

  it('should validateOpenModal  errorRetry === true', () => {
    component['_openOtp'] = true;

    const spy1 = spyOn(component, 'openErrorModal').and.callFake(() => null);

    injectedFacade.redeemPoints$ = of({
      information: null,
      loading: false,
      completed: false,
      error: false,
      errorRetry: true,
      errorMessage: '',
      errorCode: 0
    });

    component.validateOpenModal();
    expect(spy1).toHaveBeenCalled();
  });

  it('should dispatchRedeem _openOtp === true', () => {
    injectedFacade.generateOtp$ = of({
      information: {
        BankInfo: null,
        Transaction: { ApprovalId: '123456' },
        errorMessage: '',
        specificErrorMessage: '',
        success: true
      },
      loading: true,
      completed: false,
      error: false,
      errorMessage: ''
    });
    component['_openOtp'] = true;
    const spy1 = spyOn(component, 'validateOpenModal').and.callFake(() => null);
    component.dispatchRedeem();
    expect(component['_approvalIdOtp']).toEqual('123456');
    expect(spy1).toHaveBeenCalled();
  });

  it('should dispatchRedeem errorRetry === false', () => {
    injectedFacade.generateOtp$ = of({
      information: {
        BankInfo: null,
        Transaction: { ApprovalId: '123456' },
        errorMessage: '',
        specificErrorMessage: '',
        success: true
      },
      loading: true,
      completed: false,
      error: false,
      errorMessage: ''
    });
    component['_openOtp'] = false;
    const spy1 = spyOn(component, 'validateOpenModal').and.callFake(() => null);
    component.dispatchRedeem();
    expect(spy1).toHaveBeenCalled();
  });

  it('should overflowModalButton ', () => {
    const spy1 = spyOn(modal, 'close').and.callFake(() => null);
    component.overflowModalButton();
    expect(spy1).toHaveBeenCalled();
  });
});
