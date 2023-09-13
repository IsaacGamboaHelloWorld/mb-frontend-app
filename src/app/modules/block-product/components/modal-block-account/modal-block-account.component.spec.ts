import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { ModalBlockAccountComponent } from './modal-block-account.component';
import { TestingModule } from '@test-helpers/testing.module';
import { BlockProductsFacade } from '@modules/block-product/block-products.facade';
import { BlockProductsFacadeMock } from '@test-helpers/mocks/facade/block-products.facade.mock';

describe('ModalBlockAccountComponent', () => {
  let component: ModalBlockAccountComponent;
  let fixture: ComponentFixture<ModalBlockAccountComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ModalBlockAccountComponent],
        imports: [IonicModule, TestingModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();
      TestBed.overrideComponent(ModalBlockAccountComponent, {
        set: {
          providers: [
            {
              provide: BlockProductsFacade,
              useClass: BlockProductsFacadeMock
            }
          ]
        }
      }).compileComponents();

      fixture = TestBed.createComponent(ModalBlockAccountComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return status burron, typeButtons()', () => {
    expect(component.typeButtons.primary).toEqual('primary');
  });

  it('should call facade.fetchBlockProduct, blockProduct()', () => {
    spyOn(component['facade'], 'fetchBlockProduct');
    component.blockProduct();
    expect(component['facade'].fetchBlockProduct).toHaveBeenCalled();
  });

  it('should call modalService.setActionButton with type', () => {
    spyOn(component.modalService, 'setActionButton');
    component.actionButton('typeMock');
    expect(component.modalService.setActionButton).toHaveBeenCalledWith(
      'typeMock'
    );
  });
});
