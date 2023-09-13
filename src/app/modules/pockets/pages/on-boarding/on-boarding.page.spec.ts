import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { OnBoardingPage } from './on-boarding.page';
import { TestingModule } from '@test-helpers/testing.module';
import { PocketsFacade } from '@modules/pockets/pockets.facade';
import { MainContainerFacadeMock } from '@test-helpers/mocks/facade/main-container.facade.mock';
import { SecurityService } from '@commons/security/services/security.service';
import { Security } from '@commons/security/utils/security';

describe('OnBoardingPage', () => {
  let component: OnBoardingPage;
  let fixture: ComponentFixture<OnBoardingPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [OnBoardingPage],
        imports: [IonicModule, TestingModule],
        providers: [
          {
            provide: PocketsFacade,
            useClass: MainContainerFacadeMock
          },
          SecurityService,
          Security
        ],
        schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(OnBoardingPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
