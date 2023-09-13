import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { GroupOtherProductsComponent } from './group-other-products.component';
import { TestingModule } from '@test-helpers/testing.module';
import { productsMock } from '@test-helpers/mocks/facade/main-container.facade.mock';

describe('GroupOtherProductsComponent', () => {
  let component: GroupOtherProductsComponent;
  let fixture: ComponentFixture<GroupOtherProductsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [GroupOtherProductsComponent],
        imports: [IonicModule, TestingModule],
        schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(GroupOtherProductsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate method', () => {
    component.setProduct({
      ...productsMock.DEPOSIT_ACCOUNT[0],
      loading: false,
      error: false,
      completed: true,
      errorMessage: ''
    } as any);
    component.trackByFn(0, {
      ...productsMock.DEPOSIT_ACCOUNT[0],
      loading: false,
      error: false,
      completed: true,
      errorMessage: ''
    } as any);
    expect(component.products).toBeUndefined();
  });
});
