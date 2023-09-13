import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Injector,
  NO_ERRORS_SCHEMA,
  OnInit
} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

import { AbstractEnrollmentComponent } from './abstract-enrollment.component';
import { SecurityService } from '@commons/security/services/security.service';
import { TestingModule } from '@test-helpers/testing.module';
import { Security } from '@commons/security/utils/security';
import { AuthFacade } from '@modules/auth/auth.facade';
import { AuthFacadeMock } from '@test-helpers/mocks/facade/auth.facade.mock';
import { AppFacade } from '@app/app.facade';
import { AppFacadeMock } from '@test-helpers/mocks/facade/app.facade.mock';
import { PublicKey } from '@commons/services/auth/auth.service';

describe('AbstractEnrollmentComponent', () => {
  @Component({
    selector: 'dummy-class',
    template: ''
  })
  class DummyClass extends AbstractEnrollmentComponent implements OnInit {
    formMock: FormGroup;

    constructor(protected injector: Injector, private fb: FormBuilder) {
      super(injector);
    }

    ngOnInit() {
      this.formMock = this.fb.group({
        id: ['idMock']
      });
    }
  }

  let component: DummyClass;
  let fixture: ComponentFixture<DummyClass>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DummyClass],
        imports: [TestingModule, IonicModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
        providers: [
          SecurityService,
          Security,
          {
            provide: AuthFacade,
            useClass: AuthFacadeMock
          },
          {
            provide: AppFacade,
            useClass: AppFacadeMock
          }
        ]
      }).compileComponents();

      fixture = TestBed.createComponent(DummyClass);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call facade.setLoadingAut, submitForm()', () => {
    const resp: BehaviorSubject<boolean> = new BehaviorSubject(true);
    const resp2: BehaviorSubject<PublicKey> = new BehaviorSubject({
      publicKey: 'keyMock'
    });
    spyOn<any>(
      component['securityService'],
      'initializeSecurityKeys$'
    ).and.returnValue(resp);

    spyOn<any>(component['authService'], 'getServerPublicKey').and.returnValue(
      resp2
    );

    spyOn<any>(component['facade'], 'setLoadingAuth');
    component.ngOnInit();
    component['submitForm'](component.formMock.value);
    expect(component['facade'].setLoadingAuth).toHaveBeenCalled();
  });

  it('should call error, submitForm()', () => {
    const error = Observable.create((subscriber) => {
      subscriber.error(new Error('error1'));
    });

    spyOn<any>(
      component['securityService'],
      'initializeSecurityKeys$'
    ).and.returnValue(error);

    spyOn<any>(component['facade'], 'setErrorAuth');

    component.ngOnInit();
    component['submitForm'](component.formMock.value);
    expect(component['facade'].setErrorAuth).toHaveBeenCalled();
  });

  it('should be equal to null, component.information$()', (done: DoneFn) => {
    component.information$.subscribe((resp) => {
      expect(resp).toEqual(null);
      done();
    });
  });

  it('should return function', () => {
    spyOn<any>(component, 'mustMatch');
    component['mustMatch']('id', 'id2');
    expect(component['mustMatch']).toHaveBeenCalledOnceWith('id', 'id2');
    expect(typeof component['mustMatch']).toEqual('function');
  });
});
