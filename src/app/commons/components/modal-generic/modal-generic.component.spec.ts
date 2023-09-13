import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { ModalGenericComponent } from './modal-generic.component';
import { ModalService } from '@commons/services/modal.service';
import { VelocityImageTitleModule } from '@commons/velocity/molecules/velocity-image-title/velocity-image-title.module';

describe('ModalGenericComponent', () => {
  let component: ModalGenericComponent;
  let fixture: ComponentFixture<ModalGenericComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ModalGenericComponent],
        imports: [IonicModule, VelocityImageTitleModule],
        providers: [
          {
            provide: ModalService,
            useValue: {
              modal: {
                componentProps: ''
              },
              setActionButton: () => {}
            }
          }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(ModalGenericComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
    component.actionButton('', false);
    expect(component.typeButtons).toBeTruthy();
  });
});
