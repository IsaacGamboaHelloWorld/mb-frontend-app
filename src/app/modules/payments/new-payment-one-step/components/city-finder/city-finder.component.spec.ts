import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { CityFinderComponent } from './city-finder.component';
import { TestingModule } from '@test-helpers/testing.module';
import { PaymentOneStepFacadeMock } from '@test-helpers/mocks/facade/payment-one-step.facade.mock';
import { PaymentsFacade } from '@modules/payments/payments.facade';
import { ITaxesCity } from '@modules/payments/entities/tax-payment.entities';
import { ITaxesCitiesState } from '@modules/payments/store/payments.state';

describe('CityFinderComponent', () => {
  let component: CityFinderComponent;
  let fixture: ComponentFixture<CityFinderComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CityFinderComponent],
        imports: [IonicModule, TestingModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      });
      TestBed.overrideComponent(CityFinderComponent, {
        set: {
          providers: [
            {
              provide: PaymentsFacade,
              useClass: PaymentOneStepFacadeMock
            }
          ]
        }
      }).compileComponents();

      fixture = TestBed.createComponent(CityFinderComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      component.formCityFinder.setValue({
        searchTerm: 'searchTermMock',
        selectedItem: 'selectedItemMock'
      });

      const data: ITaxesCitiesState = {
        listCities: [
          {
            id: 'idMock',
            name: 'nameMock'
          }
        ],
        loading: false,
        completed: false,
        error: false,
        errorMessage: ''
      };
      const taxes: Observable<ITaxesCitiesState> = new BehaviorSubject(data);
      spyOnProperty(component, 'cities$', 'get').and.returnValue(taxes);
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('searchTerm return an AbstractcControl', () => {
    expect(component.searchTerm).toBeInstanceOf(AbstractControl);
    expect(component.searchTerm.value).toEqual('searchTermMock');
    expect(component.selectedItem).toBeInstanceOf(AbstractControl);
    expect(component.selectedItem.value).toEqual('selectedItemMock');
  });

  it('should be equal to false', (done: DoneFn) => {
    component.formCityFinder.setValue({
      searchTerm: '',
      selectedItem: 'selectedItemMock'
    });
    component.showWelcomeMsg.subscribe((resp) => {
      expect(resp).toBeTrue();
      done();
    });
  });

  it('should call modalsService.close, closeModal()', () => {
    spyOn<any>(component['modalService'], 'close');
    component.closeModal();
    expect(component['modalService'].close).toHaveBeenCalled();
  });

  it('should call modalsService.close, closeModal()', () => {
    spyOn<any>(component['modalService'], 'close');
    component.submitForm();
    expect(component['modalService'].close).toHaveBeenCalled();
  });

  it('trackByTo return a string', () => {
    const city: ITaxesCity = {
      id: '1234',
      name: 'id'
    };
    const trackBy = component.trackByTo(0, city);
    expect(trackBy).toBeInstanceOf(String);
    expect(trackBy).toBe('1234');
    expect(trackBy).not.toBeNaN();
  });
});
