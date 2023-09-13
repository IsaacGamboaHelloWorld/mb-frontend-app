import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { TestingModule } from '@test-helpers/testing.module';
import { ContModalRedirectComponent } from './cont-modal-redirect.component';
import { ModalService } from '@commons/services/modal.service';

describe('ContModalRedirectComponent', () => {
  let component: ContModalRedirectComponent;
  let fixture: ComponentFixture<ContModalRedirectComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ContModalRedirectComponent],
        imports: [IonicModule, TestingModule],
        providers: [
          {
            provide: ModalService,
            useValue: {
              modal: {
                componentProps: {
                  id: '123',
                  type: 'CREDIT_CARD'
                }
              }
            }
          }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(ContModalRedirectComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate save storage', () => {
    component.redirect();
    expect(component.props).toBeTruthy();
  });
});
