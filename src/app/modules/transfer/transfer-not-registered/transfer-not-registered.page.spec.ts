import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { IonicModule } from '@ionic/angular';

import { TestingModule } from '@test-helpers/testing.module';
import { TransferNotRegisteredPage } from '@modules/transfer/transfer-not-registered/transfer-not-registered.page';
import { NewTransferFacade } from '@modules/transfer/transfer.facade';
import { NewTransferFacadeMock } from '@test-helpers/mocks/facade/new-transfer.facade.mock';
import { MainContainerFacade } from '@modules/main-container/main-container.facade';
import { MainContainerFacadeMock } from '@test-helpers/mocks/facade/main-container.facade.mock';

describe('TransferNotRegisteredPage', () => {
  let component: TransferNotRegisteredPage;
  let fixture: ComponentFixture<TransferNotRegisteredPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TransferNotRegisteredPage],
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

      fixture = TestBed.createComponent(TransferNotRegisteredPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
