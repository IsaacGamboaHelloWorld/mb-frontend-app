import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { VelocityCardOpenNewProductComponent } from './velocity-card-open-new-product.component';

describe('VelocityCardOpenNewProductComponent', () => {
  let component: VelocityCardOpenNewProductComponent;
  let fixture: ComponentFixture<VelocityCardOpenNewProductComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [VelocityCardOpenNewProductComponent],
        imports: [IonicModule],
        schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(VelocityCardOpenNewProductComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should get img', () => {
    component.img = 'imgMock';

    expect(component.hasImg).toEqual(true);
  });
});
