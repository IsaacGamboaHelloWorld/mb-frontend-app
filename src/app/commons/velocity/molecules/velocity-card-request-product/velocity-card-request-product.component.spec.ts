import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { VelocityCardRequestProductComponent } from './velocity-card-request-product.component';
import { TestingModule } from '@test-helpers/testing.module';

describe('VelocityCardRequestProductComponent', () => {
  let component: VelocityCardRequestProductComponent;
  let fixture: ComponentFixture<VelocityCardRequestProductComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [VelocityCardRequestProductComponent],
        imports: [IonicModule, TestingModule],
        schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(VelocityCardRequestProductComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return true, hasIcon()', () => {
    component.icon = 'iconMock';
    expect(component.hasIcon).toBeTrue();
  });
  it('should emit true, actionCard()', () => {
    spyOn(component.selectedCard, 'emit');
    component.actionCard();
    expect(component.selectedCard.emit).toHaveBeenCalled();
  });
});
