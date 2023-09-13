import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { ToWhoNotRegisteredComponent } from '@modules/transfer/transfer-not-registered/components/to-who-not-registered/to-who-not-registered.component';
import { TestingModule } from '@test-helpers/testing.module';
import { NewTransferFacade } from '@modules/transfer/transfer.facade';
import { NewTransferFacadeMock } from '@test-helpers/mocks/facade/new-transfer.facade.mock';
import { MainContainerFacade } from '@modules/main-container/main-container.facade';
import { MainContainerFacadeMock } from '@test-helpers/mocks/facade/main-container.facade.mock';

describe('ToWhoNotRegisteredComponent', () => {
  let component: ToWhoNotRegisteredComponent;
  let fixture: ComponentFixture<ToWhoNotRegisteredComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ToWhoNotRegisteredComponent],
        imports: [IonicModule, TestingModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
        providers: [
          {
            provide: NewTransferFacade,
            useClass: NewTransferFacadeMock
          },
          {
            provide: MainContainerFacade,
            useClass: MainContainerFacadeMock
          }
        ]
      }).compileComponents();

      fixture = TestBed.createComponent(ToWhoNotRegisteredComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
