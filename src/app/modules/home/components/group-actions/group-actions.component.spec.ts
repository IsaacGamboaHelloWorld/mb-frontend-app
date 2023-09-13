import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { GroupActionsComponent } from './group-actions.component';
import { HomeFacade } from '@modules/home/home.facade';
import { HomeFacadeMock } from '@test-helpers/mocks/facade/home.facade.mock';
import { TestingModule } from '@test-helpers/testing.module';

describe('GroupActionsComponent', () => {
  let component: GroupActionsComponent;
  let fixture: ComponentFixture<GroupActionsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [GroupActionsComponent],
        imports: [IonicModule, TestingModule],
        providers: [
          InAppBrowser,
          {
            provide: HomeFacade,
            useClass: HomeFacadeMock
          }
        ],
        schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(GroupActionsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get external_url.to_plus', () => {
    expect(component.url).toEqual(
      'https://www.tuplus.com.co/wps/portal/portal-lealtad/web/inicio'
    );
  });

  it('resp to be equal to null component.typeStocks$', (done: DoneFn) => {
    component.typeStocks$.subscribe((resp) => {
      expect(resp).toBe(null);
      done();
    });
  });

  it('resp to be equal to null component.periodStocks$$', (done: DoneFn) => {
    component.periodStocks$.subscribe((resp) => {
      expect(resp).toBe(null);
      done();
    });
  });

  it('resp to be false to null component.isLoadingStocksAll$', (done: DoneFn) => {
    component.isLoadingStocksAll$.subscribe((resp) => {
      expect(resp).toBe(false);
      done();
    });
  });

  it('should call openModal()', () => {
    spyOn<any>(component['modalService'], 'openModal');
    component.openModal();
    expect(component['modalService'].openModal).toHaveBeenCalled();
  });

  it('should call facade.logout', () => {
    spyOn(component['facade'], 'logout');
    spyOn(window, 'open');
    component.openBrowser();
    expect(component['facade'].logout).toHaveBeenCalled();
    expect(window.open).toHaveBeenCalled();
  });

  it('should set toPlus', () => {
    const toPlusData = {
      information: {
        success: true,
        status: 'done',
        totalPoints: 1,
        points: {
          BANCO_DE_BOGOTA: 1,
          BANCO_POPULAR: 1,
          BANCO_OCCIDENTE: 1,
          BANCO_AV_VILLAS: 1
        }
      },
      errorMessage: 'errorMessageMock',
      loading: false,
      completed: true,
      error: false
    };
    const toPlus = component.setTuplus(toPlusData);
    expect(toPlus.success).toEqual(true);
  });

  it('should call facade.fetchStocksAll', () => {
    const data = {
      period: 'periodMock',
      stockType: 'stockTypeMock'
    };
    spyOn(component['facade'], 'fetchStocksAll');
    component.fetchStocks(data);
    expect(component['facade'].fetchStocksAll).toHaveBeenCalled();
  });

  it('should call modalService.close', () => {
    spyOn<any>(component['modalService'], 'close');
    component['closeModal']();
    expect(component['modalService'].close).toHaveBeenCalled();
  });
});
