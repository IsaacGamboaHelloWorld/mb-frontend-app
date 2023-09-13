import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { HeaderComponent } from './header.component';
import { TestingModule } from '@test-helpers/testing.module';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [HeaderComponent],
        imports: [IonicModule, TestingModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(HeaderComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    component.toggleMenu();
    expect(component).toBeTruthy();
  });

  it('should validate newText', () => {
    component.toggleMenu();
    expect(component).toBeTruthy();
    component.text = 'Hola';
    expect(component.newText).toBe('Hola');
    component.text = null;
    component.showGreeting = false;
    expect(component.newText).toBe('');
  });
});
