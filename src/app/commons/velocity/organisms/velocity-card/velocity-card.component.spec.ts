import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { VelocityCardComponent } from 'src/app/commons/velocity/organisms/velocity-card/velocity-card.component';

describe('VelocityCardComponent', () => {
  let component: VelocityCardComponent;
  let fixture: ComponentFixture<VelocityCardComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [VelocityCardComponent],
        imports: [IonicModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(VelocityCardComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be return has Product', () => {
    component.product = {
      success: true,
      loading: false,
      completed: true,
      error: false,
      errorMessage: '',
      name: 'text',
      id: '123',
      img: 'text',
      content: {
        title: 'title',
        amount: 'string',
        amountSmall: 'string',
        link: 'string',
        showFooter: true
      },
      sectionError: {
        title: '',
        description: '',
        textButton: '',
        typeButton: ''
      }
    };
    expect(component.hasProduct).toBeTruthy();
    expect(component.hasLink).toBeTruthy();
    expect(component.hasAmountSmall).toBeTruthy();
  });
});
