import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { WhereToRedeemComponent } from './where-to-redeem.component';
import { TestingModule } from '@test-helpers/testing.module';
import { TuplusFacade } from '@modules/tuplus/tuplus.facade';
import { TuplusFacadeMock } from '@test-helpers/mocks/facade/tuplus.facade.mock';

describe('WhereToRedeemComponent', () => {
  let component: WhereToRedeemComponent;
  let fixture: ComponentFixture<WhereToRedeemComponent>;
  let injectedFacade: TuplusFacade;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [WhereToRedeemComponent],
        imports: [IonicModule, TestingModule],
        providers: [
          {
            provide: TuplusFacade,
            useClass: TuplusFacadeMock
          }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(WhereToRedeemComponent);
      injectedFacade = TestBed.inject(TuplusFacade);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('validate back to option to redeem ', () => {
    const spy1 = spyOn(component.navCtrl, 'navigateBack').and.callFake(
      () => null
    );
    component.back();
    expect(spy1).toHaveBeenCalled();
  });

  it('openBrowser', () => {
    const spy1 = spyOn(injectedFacade, 'logout').and.callFake(() => null);
    component.openBrowser();
    expect(spy1).toHaveBeenCalled();
  });
});
