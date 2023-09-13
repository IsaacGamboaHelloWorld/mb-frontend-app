import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { IonicModule } from '@ionic/angular';

import { HomeContainerComponent } from './home-container.component';
import { MainContainerFacade } from '@modules/main-container/main-container.facade';
import { MainContainerFacadeMock } from '@test-helpers/mocks/facade/main-container.facade.mock';
import { TestingModule } from '@test-helpers/testing.module';
import { SecurityService } from '@commons/security/services/security.service';
import { Security } from '@commons/security/utils/security';
import { AdlSecureStorageService } from '@commons/services/adl-security-storage.service';

describe('HomeContainerComponent', () => {
  let component: HomeContainerComponent;
  let fixture: ComponentFixture<HomeContainerComponent>;
  let serviceFacade: MainContainerFacade;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [HomeContainerComponent],
        imports: [IonicModule, TestingModule],
        providers: [
          SecurityService,
          Security,
          AdlSecureStorageService,
          FingerprintAIO,
          {
            provide: MainContainerFacade,
            useClass: MainContainerFacadeMock
          }
        ],
        schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(HomeContainerComponent);
      component = fixture.componentInstance;
      serviceFacade = fixture.debugElement.injector.get(MainContainerFacade);
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ionViewWillEnter works correctly', () => {
    const spyFetchTuplus = spyOn(serviceFacade, 'fetchTuplus').and.callFake(
      () => null
    );
    const spyFetchStocksType = spyOn(
      serviceFacade,
      'fetchStocksType'
    ).and.callFake(() => null);
    const spyFetchStocksPeriod = spyOn(
      serviceFacade,
      'fetchStocksPeriod'
    ).and.callFake(() => null);
    const spyFetchLoadProducts = spyOn(
      serviceFacade,
      'fetchLoadProducts'
    ).and.callFake(() => null);
    const spyFetchNicknames = spyOn(
      serviceFacade,
      'fetchNicknames'
    ).and.callFake(() => null);

    component.ionViewWillEnter();

    expect(spyFetchTuplus).toHaveBeenCalled();
    expect(spyFetchStocksType).toHaveBeenCalled();
    expect(spyFetchStocksPeriod).toHaveBeenCalled();
    expect(spyFetchLoadProducts).toHaveBeenCalled();
    expect(spyFetchNicknames).toHaveBeenCalled();
  });
});
