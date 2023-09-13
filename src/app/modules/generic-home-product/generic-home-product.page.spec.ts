import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestingModule } from '@test-helpers/testing.module';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';

import { GenericHomeProductPage } from './generic-home-product.page';
import { GenericHomeService } from '@commons/utils/generic-home.service';

describe('GenericHomeProductPage', () => {
  let component: GenericHomeProductPage;
  let fixture: ComponentFixture<GenericHomeProductPage>;
  let navService: NavController;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [GenericHomeProductPage],
        imports: [IonicModule, TestingModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
        providers: [GenericHomeService, NavController]
      }).compileComponents();

      fixture = TestBed.createComponent(GenericHomeProductPage);
      component = fixture.componentInstance;
      navService = fixture.debugElement.injector.get(NavController);
      fixture.detectChanges();
    })
  );
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('back works correctly', () => {
    const spy = spyOn(navService, 'navigateRoot').and.callFake(() => null);
    component.back();
    expect(spy).toHaveBeenCalled();
  });
  it('redirect works correctly', () => {
    const spy = spyOn(navService, 'navigateRoot').and.callFake(() => null);
    const event = { enable: true, url: '/' };
    component.redirect(event);
    expect(spy).toHaveBeenCalled();
  });
});
