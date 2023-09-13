import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  DebugElement,
  NO_ERRORS_SCHEMA
} from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { IonicModule } from '@ionic/angular';
import { TestingModule } from '@test-helpers/testing.module';
import { By } from '@angular/platform-browser';

import { ModalProductBlockComponent } from './modal-product-block.component';

describe('ModalProductBlockComponent', () => {
  let component: ModalProductBlockComponent;
  let fixture: ComponentFixture<ModalProductBlockComponent>;

  let pElement: DebugElement;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ModalProductBlockComponent],
        imports: [IonicModule, TestingModule],
        providers: [InAppBrowser],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(ModalProductBlockComponent);
      component = fixture.componentInstance;
      component.link = 'www.google.com.co';
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(
    'should call openBrowser',
    waitForAsync(() => {
      component.openBrowser();
      spyOn(component, 'openBrowser');
      pElement = fixture.debugElement.query(By.css('a'));
      pElement.triggerEventHandler('click', null);
      expect(component.openBrowser).toHaveBeenCalled();
      component.openBrowser();
    })
  );
});
