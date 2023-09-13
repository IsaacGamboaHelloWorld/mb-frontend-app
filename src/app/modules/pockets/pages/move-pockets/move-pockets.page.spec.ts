import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { MovePocketsPage } from './move-pockets.page';
import { TestingModule } from '@test-helpers/testing.module';
import { PocketsFacade } from '@modules/pockets/pockets.facade';
import { PocketsFacadeMock } from '@test-helpers/mocks/facade/pockets.facade.mock';
import { ModalService } from '@commons/services/modal.service';

describe('MovePocketsPage', () => {
  let component: MovePocketsPage;
  let fixture: ComponentFixture<MovePocketsPage>;
  let serviceFacade: PocketsFacade;
  let serviceModal: ModalService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MovePocketsPage],
        imports: [IonicModule, TestingModule],
        providers: [
          ModalService,
          {
            provide: PocketsFacade,
            useClass: PocketsFacadeMock
          }
        ],
        schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(MovePocketsPage);
      component = fixture.componentInstance;
      serviceFacade = fixture.debugElement.injector.get(PocketsFacade);
      serviceModal = fixture.debugElement.injector.get(ModalService);
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
