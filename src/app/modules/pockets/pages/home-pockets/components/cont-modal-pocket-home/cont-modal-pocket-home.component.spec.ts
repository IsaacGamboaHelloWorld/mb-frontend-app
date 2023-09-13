import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ContModalPocketHomeComponent } from './cont-modal-pocket-home.component';
import { TestingModule } from '@test-helpers/testing.module';
import { ModalService } from '@commons/services/modal.service';
import { MainContainerFacade } from '@modules/main-container/main-container.facade';
import { MainContainerFacadeMock } from '@test-helpers/mocks/facade/main-container.facade.mock';
describe('ContModalPocketHomeComponent', () => {
  class modalServiceMock {
    get modal(): any {
      return 'work';
    }

    public close(): string {
      return 'function works';
    }
  }
  let component: ContModalPocketHomeComponent;
  let fixture: ComponentFixture<ContModalPocketHomeComponent>;
  let modalService: ModalService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ContModalPocketHomeComponent],
        imports: [IonicModule, TestingModule],
        providers: [
          ModalService,
          {
            provide: ModalService,
            useClass: modalServiceMock
          },
          {
            provide: MainContainerFacade,
            useClass: MainContainerFacadeMock
          }
        ],
        schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(ContModalPocketHomeComponent);
      component = fixture.componentInstance;
      modalService = fixture.debugElement.injector.get(ModalService);
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('closeModal works correctly', () => {
    const spy = spyOn(modalService, 'close');
    const props = component.props;
    component.closeModal();
    expect(spy).toHaveBeenCalled();
  });

  it('changeShowModalAgain works correctly', () => {
    component.showModalAgain = true;
    component.changeShowModalAgain();
    expect(component.showModalAgain).toBeInstanceOf(Boolean);
    expect(component.showModalAgain).toBe(false);
    expect(component.showModalAgain).not.toBeNull();
    expect(component.showModalAgain).not.toBeNaN();
    expect(component.showModalAgain).not.toBeUndefined();
  });
});
