import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { IonicModule, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { NavBarComponent } from './nav-bar.component';
import { TestingModule } from '@test-helpers/testing.module';
import { MainContainerFacade } from '@modules/main-container/main-container.facade';
import { MainContainerFacadeMock } from '@test-helpers/mocks/facade/main-container.facade.mock';
import { ItemNavBar } from '@modules/main-container/entities/user.entities';
import { ModalService } from '@commons/services/modal.service';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let barcodeScannerServcie: BarcodeScanner;
  let facadeService: MainContainerFacade;
  let navService: NavController;
  let modalService: ModalService;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [NavBarComponent],
        imports: [IonicModule, TestingModule],
        providers: [
          BarcodeScanner,
          NavController,
          ModalService,
          {
            provide: MainContainerFacade,
            useClass: MainContainerFacadeMock
          }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(NavBarComponent);
      component = fixture.componentInstance;
      barcodeScannerServcie = fixture.debugElement.injector.get(BarcodeScanner);
      facadeService = fixture.debugElement.injector.get(MainContainerFacade);
      navService = fixture.debugElement.injector.get(NavController);
      modalService = fixture.debugElement.injector.get(ModalService);
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('actionQr works correctly', () => {
    const spyBarcodeScanner = spyOn(barcodeScannerServcie, 'scan');
    component.actionQr(true);
    expect(spyBarcodeScanner).toHaveBeenCalled();
  });
  it('actionQr works correctly when it is false', () => {
    const spyBarcodeScanner = spyOn(barcodeScannerServcie, 'scan');
    component.actionQr(false);
    expect(spyBarcodeScanner).not.toHaveBeenCalled();
  });
  it('openQR works correctly', () => {
    const spyFacadeService = spyOn(
      facadeService,
      'filterProducts$'
    ).and.callThrough();
    const spyNavService = spyOn(navService, 'navigateForward').and.callFake(
      () => null
    );
    component.openQR(true);
    expect(spyFacadeService).toHaveBeenCalled();
    expect(spyNavService).toHaveBeenCalled();
  });
  it('openQR works correctly when it is false', () => {
    const spyNavService = spyOn(navService, 'navigateRoot').and.callFake(
      () => null
    );
    component.openQR(false);
    expect(spyNavService).toHaveBeenCalled();
  });
  it('clickItem works correctly', () => {
    const item: ItemNavBar = {
      enable: true,
      hasProducts: true,
      navigateTo: [''],
      hasAmount: true,
      hasPermissions: true
    };
    const spyNavService = spyOn(navService, 'navigateRoot').and.callFake(
      () => null
    );
    component.clickItem(item);
    expect(spyNavService).toHaveBeenCalled();
  });
  it('clickItem works correctly when hasProducts is false', () => {
    const item: ItemNavBar = {
      enable: true,
      hasProducts: false,
      navigateTo: [''],
      hasAmount: true,
      hasPermissions: true
    };
    const spyNavService = spyOn(navService, 'navigateRoot').and.callFake(
      () => null
    );
    component['_validateStep'](new Observable(), false, '');
    component.clickItem(item);
    expect(spyNavService).toHaveBeenCalled();
  });
  it('openLoading works correctly', () => {
    const spyModalService = spyOn(modalService, 'openModal').and.callFake(
      () => null
    );
    component['openLoading']();
    expect(spyModalService).toHaveBeenCalled();
  });
});
