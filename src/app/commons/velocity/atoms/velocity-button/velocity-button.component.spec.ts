import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { VelocityButtonComponent } from '@commons/velocity/atoms/velocity-button/velocity-button.component';

describe('BtnComponent', () => {
  let component: VelocityButtonComponent;
  let fixture: ComponentFixture<VelocityButtonComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [VelocityButtonComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(VelocityButtonComponent);
    component = fixture.componentInstance;
    component.id = 'btn-login';
    component.text = 'Ingresar';
    component.type = 'submit';
    fixture.detectChanges();
  });

  it('should create', () => {
    component.actionButton.emit();
    expect(component).toBeTruthy();

    expect(fixture.debugElement.query(By.css('.btn')).nativeElement.id).toBe(
      'btn-login'
    );

    expect(
      fixture.debugElement.query(By.css('.btn')).nativeElement.textContent
    ).toContain('Ingresar');
  });
});
