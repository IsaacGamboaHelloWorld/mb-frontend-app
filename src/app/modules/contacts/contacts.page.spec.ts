import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';

import { ContactsPage } from './contacts.page';
import { TestingModule } from '@test-helpers/testing.module';
import { ContactService } from '@modules/contacts/services/contact.service';

describe('ContactsPage', () => {
  let component: ContactsPage;
  let fixture: ComponentFixture<ContactsPage>;
  let routerSpy = { navigateRoot: jasmine.createSpy('navigateRoot') };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ContactsPage],
        imports: [IonicModule, TestingModule],
        providers: [
          ContactService,
          { provide: NavController, useValue: routerSpy }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(ContactsPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to HOME', () => {
    component.back();
    expect(routerSpy.navigateRoot).toHaveBeenCalledWith(['']);
  });

  it('should return "" ', () => {
    expect(component.setIcon(3)).toEqual('');
  });

  it('should be defined', () => {
    Capacitor.getPlatform = jasmine.createSpy().and.returnValue('android');
    component.openApp('123');
    expect(component.openApp).toBeDefined();
  });
});
