import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { TestingModule } from '@test-helpers/testing.module';
import { EditPocketsPage } from './edit-pockets.page';
import { PocketsFacade } from '@modules/pockets/pockets.facade';
import { PocketsFacadeMock } from '@test-helpers/mocks/facade/pockets.facade.mock';
import { ModalService } from '@commons/services/modal.service';

describe('EditPocketsPage', () => {
  let component: EditPocketsPage;
  let fixture: ComponentFixture<EditPocketsPage>;
  let modalService: ModalService;
  let facadeService: PocketsFacade;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [EditPocketsPage],
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

      fixture = TestBed.createComponent(EditPocketsPage);
      component = fixture.componentInstance;
      modalService = fixture.debugElement.injector.get(ModalService);
      facadeService = fixture.debugElement.injector.get(PocketsFacade);
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
