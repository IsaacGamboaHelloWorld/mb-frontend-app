import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { ActiveCardComponent } from './active-card.component';
import { HomeActiveFacade } from '@modules/activate-credit-card/home-active.facade';
import { HomeActiveBlockFacadeMock } from '@test-helpers/mocks/facade/home-active-block.facade.mock';
import { TestingModule } from '@test-helpers/testing.module';
import { PageOpenAccountService } from '@commons/velocity/pages/utils/page-open-account.service';

describe('ActiveCardComponent', () => {
  let component: ActiveCardComponent;
  let fixture: ComponentFixture<ActiveCardComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ActiveCardComponent],
        imports: [IonicModule, TestingModule],
        providers: [
          PageOpenAccountService,
          {
            provide: HomeActiveFacade,
            useClass: HomeActiveBlockFacadeMock
          }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(ActiveCardComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return null creditCards$()', () => {
    component.hasProducts$.subscribe((resp) => {
      expect(resp).toEqual(false);
    });
  });

  it('should call facade function', () => {
    component.formActiveCreditCard.setValue({ productId: '34564345634654444' });
    spyOn<any>(component['facade'], 'fetchActiveCreditCard');
    component.formSubmit();
    expect(component['facade'].fetchActiveCreditCard).toHaveBeenCalled();
  });
});
