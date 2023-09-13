import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { ModalBlockComponent } from './modal-block.component';
import { TestingModule } from '@test-helpers/testing.module';
import { BlockProductsFacade } from '@modules/block-product/block-products.facade';
import { BlockProductsFacadeMock } from '@test-helpers/mocks/facade/block-products.facade.mock';

describe('ModalBlockComponent', () => {
  let component: ModalBlockComponent;
  let fixture: ComponentFixture<ModalBlockComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ModalBlockComponent],
        imports: [IonicModule, TestingModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      });
      TestBed.overrideComponent(ModalBlockComponent, {
        set: {
          providers: [
            {
              provide: BlockProductsFacade,
              useClass: BlockProductsFacadeMock
            }
          ]
        }
      }).compileComponents();

      fixture = TestBed.createComponent(ModalBlockComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call facade.fetchBlockProduct', () => {
    spyOn<any>(component['facade'], 'fetchBlockProduct');
    component.blockProduct();
    expect(component['facade'].fetchBlockProduct).toHaveBeenCalled();
  });

  it('should call facade.fetchBlockProduct with form valid', () => {
    component.formBlock.setValue({
      typeBlock: 'typeBlockMock'
    });
    spyOn<any>(component['facade'], 'fetchBlockProduct');
    component.submitForm();
    expect(component['facade'].fetchBlockProduct).toHaveBeenCalled();
  });
});
