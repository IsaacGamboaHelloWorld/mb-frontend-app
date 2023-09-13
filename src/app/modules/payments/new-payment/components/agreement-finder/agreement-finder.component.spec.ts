import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { AgreementFinderComponent } from './agreement-finder.component';
import { TestingModule } from '@test-helpers/testing.module';
import { PaymentsFacade } from '@modules/payments/payments.facade';
import { PaymentFacadeMock } from '@test-helpers/mocks/facade/payment.facade.mock';
import { ISearchBillerState } from '@modules/payments/store/payments.state';
import { IAgreement } from '@modules/payments/entities/billers.entities';

describe('AgreementFinderComponent', () => {
  let component: AgreementFinderComponent;
  let fixture: ComponentFixture<AgreementFinderComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AgreementFinderComponent],
        imports: [IonicModule, TestingModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      });
      TestBed.overrideComponent(AgreementFinderComponent, {
        set: {
          providers: [
            {
              provide: PaymentsFacade,
              useClass: PaymentFacadeMock
            }
          ]
        }
      }).compileComponents();

      fixture = TestBed.createComponent(AgreementFinderComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      component.formAgreementFinder.setValue({
        searchTerm: 'searchTermMock',
        selectedItem: 'selectedMock'
      });
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be equal to selectedMock', () => {
    expect(component.selectedItem.value).toEqual('selectedMock');
  });

  it('should return true', (done: DoneFn) => {
    const data: ISearchBillerState = {
      information: [
        {
          organizationIdType: '',
          organizationId: '',
          entityName: '',
          industryCode: '',
          image: '',
          phoneType: '',
          phone: '',
          category: '',
          address: '',
          cityId: '',
          city: '',
          partialPayment: true,
          active: true,
          onlinePayment: '',
          svcId: '',
          noBillerMainReference: '',
          bankName: '',
          bankCode: ''
        }
      ],
      loading: false,
      completed: false,
      error: false,
      errorMessage: ''
    };
    const mockValue$: BehaviorSubject<ISearchBillerState> = new BehaviorSubject(
      data
    );
    spyOnProperty(component, 'resultsFound$').and.returnValue(mockValue$);
    component.hasResults$.subscribe((resp) => {
      expect(resp).toBeTrue();
      done();
    });
  });

  it('should call modalService.close when submitform', () => {
    spyOn<any>(component['modalService'], 'close');
    component.submitForm();
    expect(component['modalService'].close).toHaveBeenCalled();
  });
  it('should call modalService.close', () => {
    spyOn<any>(component['modalService'], 'close');
    component.closeModal();
    expect(component['modalService'].close).toHaveBeenCalled();
  });

  it('trackByTo return a string', () => {
    const loan: IAgreement = {
      organizationIdType: '',
      organizationId: 'phone',
      entityName: '',
      industryCode: '',
      image: '',
      phoneType: '',
      phone: '1234',
      category: '',
      address: '',
      cityId: '',
      city: '',
      partialPayment: true,
      active: true,
      onlinePayment: '',
      svcId: '',
      noBillerMainReference: '',
      bankName: '',
      bankCode: ''
    };
    const trackBy = component.trackByTo(0, loan);
    expect(trackBy).toBeInstanceOf(String);
    expect(trackBy).toBe('1234');
    expect(trackBy).not.toBeNaN();
  });
  it('should call facade.fetchSearchBiller', (done: DoneFn) => {
    component.searchTerm.valueChanges.subscribe((resp) => {
      expect(resp).toEqual('searchTermMock');
      done();
    });
    component.formAgreementFinder.setValue({
      searchTerm: 'searchTermMock',
      selectedItem: 'selectedMock'
    });
  });
});
