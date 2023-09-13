import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  AnimationController,
  IonicModule,
  MenuController,
  NavController
} from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

import { SideMenuComponent } from './side-menu.component';
import { TestingModule } from '@test-helpers/testing.module';
import { MainContainerFacade } from '@modules/main-container/main-container.facade';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { MainContainerFacadeMock } from '@test-helpers/mocks/facade/main-container.facade.mock';

describe('SideMenuComponent', () => {
  let component: SideMenuComponent;
  let fixture: ComponentFixture<SideMenuComponent>;
  let menuService: MenuController;
  let animationService: AnimationController;
  let appBrowserService: InAppBrowser;
  let navService: NavController;
  let facadeService: MainContainerFacade;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SideMenuComponent],
        imports: [IonicModule, TestingModule],
        providers: [
          InAppBrowser,
          MenuController,
          AnimationController,
          NavController,
          {
            provide: MainContainerFacade,
            useClass: MainContainerFacadeMock
          }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(SideMenuComponent);
      component = fixture.componentInstance;
      menuService = fixture.debugElement.injector.get(MenuController);
      animationService = fixture.debugElement.injector.get(AnimationController);
      appBrowserService = fixture.debugElement.injector.get(InAppBrowser);
      navService = fixture.debugElement.injector.get(NavController);
      facadeService = fixture.debugElement.injector.get(MainContainerFacade);

      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('toggleMenu works correctly', () => {
    const spyMenu = spyOn(menuService, 'toggle').and.callFake(() => null);
    component.toggleMenu();
    expect(spyMenu).toHaveBeenCalled();
  });
  it('openMenuAnimation works correctly', () => {
    const spyCreate = spyOn(animationService, 'create').and.callThrough();
    component.openMenuAnimation();
    expect(spyCreate).toHaveBeenCalled();
  });
  it('closeMenuAnimation works correctly', () => {
    const spyCreate = spyOn(animationService, 'create').and.callThrough();
    component.closeMenuAnimation();
    expect(spyCreate).toHaveBeenCalled();
  });
  it('redirect works correctly', () => {
    const spyCreate = spyOn(appBrowserService, 'create').and.callFake(
      () => null
    );
    component.redirect('/', true);
    expect(spyCreate).toHaveBeenCalled();
  });
  it('redirect works correctly when it is false', () => {
    const spyNav = spyOn(navService, 'navigateRoot').and.callFake(() => null);
    component.redirect('/', false);
    expect(spyNav).toHaveBeenCalled();
  });
  it('logout calls logout function correctly', () => {
    const spyFacade = spyOn(facadeService, 'logout').and.callFake(() => null);
    component.logout();
    expect(spyFacade).toHaveBeenCalled();
  });
});
