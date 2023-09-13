import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { NewStatementsPage } from './new-statements.page';
import { TestingModule } from '@test-helpers/testing.module';
import { StatementsFacade } from '@modules/documents/statements/statements.facade';
import { StatementsFacadeMock } from '@test-helpers/mocks/facade/statements.facade.mock';
import { MainContainerFacade } from '@modules/main-container/main-container.facade';
import { MainContainerFacadeMock } from '@test-helpers/mocks/facade/main-container.facade.mock';

describe('NewStatementsPage', () => {
  let component: NewStatementsPage;
  let fixture: ComponentFixture<NewStatementsPage>;
  let service: StatementsFacade;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [NewStatementsPage],
        imports: [IonicModule, TestingModule],
        providers: [
          {
            provide: StatementsFacade,
            useClass: StatementsFacadeMock
          },
          {
            provide: MainContainerFacade,
            useClass: MainContainerFacadeMock
          }
        ],
        schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(NewStatementsPage);
      component = fixture.componentInstance;
      service = fixture.debugElement.injector.get(StatementsFacade);
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ionViewDidLeave works correctly', () => {
    const spyResetPeriods = spyOn(service, 'resetPeriods').and.callFake(
      () => null
    );
    const spyResetStatementsFile = spyOn(
      service,
      'resetStatementsFile'
    ).and.callFake(() => null);

    component.ionViewDidLeave();
    expect(spyResetPeriods).toHaveBeenCalled();
    expect(spyResetStatementsFile).toHaveBeenCalled();
  });

  it('formSubmit send correctly when is valid', () => {
    let fb: FormBuilder = new FormBuilder();

    const formTest = fb.group({
      selectedProduct: ['testValue', Validators.required],
      period: ['testValue', Validators.required]
    });

    const spy = spyOn(service, 'fetchStatementsFile').and.callFake(() => null);
    component.formNewStatements = formTest;
    component.formSubmit();
    expect(spy).toHaveBeenCalled();
  });
  it('formSubmit send correctly when isn´t valid', () => {
    let fb: FormBuilder = new FormBuilder();
    const formTest = fb.group({
      selectedProduct: [null, Validators.required],
      period: [null, Validators.required]
    });
    const spy = spyOn(service, 'fetchStatementsFile').and.callFake(() => null);
    component.formNewStatements = formTest;
    component.formSubmit();
    expect(spy).not.toHaveBeenCalled();
  });

  it('period return an AbstractcControl', () => {
    let fb: FormBuilder = new FormBuilder();
    const formTest = fb.group({
      selectedProduct: [null, Validators.required],
      period: [null, Validators.required]
    });
    component.formNewStatements = formTest;
    const period = component.period;
    expect(period).toBeInstanceOf(AbstractControl);
  });
  it('selectedProduct return an AbstractcControl', () => {
    let fb: FormBuilder = new FormBuilder();
    const formTest = fb.group({
      selectedProduct: [null, Validators.required],
      period: [null, Validators.required]
    });
    component.formNewStatements = formTest;
    const selectedProduct = component.selectedProduct;
    expect(selectedProduct).toBeInstanceOf(AbstractControl);
  });

  it('should call statementsFacade.statementsFile', (done: DoneFn) => {
    component.statementsFile$.subscribe((resp) => {
      expect(resp.completed).toBeFalse();
      done();
    });
  });

  it('', () => {
    spyOn<any>(component['statementsFacade'], 'resetPeriods');
    component['_initForm']();
    component.formNewStatements.setValue({
      selectedProduct: { accountInformation: 'accountInformationMock' },
      period: 'periodMock'
    });
    expect(component['statementsFacade'].resetPeriods).toHaveBeenCalled();
  });
});
