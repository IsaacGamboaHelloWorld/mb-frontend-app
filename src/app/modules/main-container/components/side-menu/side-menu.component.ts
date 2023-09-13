import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {
  Animation,
  AnimationController,
  MenuController,
  NavController,
  Platform
} from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Capacitor } from '@capacitor/core';

// @ts-ignore
import packageInfo from '../../../../../../package.json';
import { IMenuItem } from '@commons/constants/menu_items';
import { isNullOrUndefined } from '@commons/utils/isNullOrUndefined';
import { MainContainerFacade } from '@modules/main-container/main-container.facade';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class SideMenuComponent {
  @ViewChild('appSideMenu', { static: true })
  appSideMenu: ElementRef;
  @Input() sideMenuItems: IMenuItem[];
  private hideContent: Animation;
  private showContent: Animation;
  private hideShadowContent: Animation;
  private showShadowContent: Animation;
  private itemSlideIn: Animation;

  constructor(
    private menuCtrl: MenuController,
    private facade: MainContainerFacade,
    private animationCtrl: AnimationController,
    private navCtrl: NavController,
    private iab: InAppBrowser,
    public platform: Platform
  ) {}

  get version(): string {
    return Capacitor.getPlatform() === 'ios'
      ? packageInfo.versionIos
      : packageInfo.versionAndroid;
  }

  get currentYear(): string {
    return new Date().getFullYear().toString();
  }

  get hasLasDate$(): Observable<boolean> {
    return this.facade.lastDate$.pipe(map((data) => !isNullOrUndefined(data)));
  }

  get lastDate$(): Observable<Date> {
    return this.facade.lastDate$;
  }

  public toggleMenu(): void {
    this.menuCtrl.toggle();
  }

  public async openMenuAnimation(): Promise<void> {
    this.hideContent = this.animationCtrl
      .create()
      .addElement(document.querySelector('#main-container-ro'))
      .duration(200)
      .beforeAddClass('side-menu-collapse-content');

    this.showShadowContent = this.animationCtrl
      .create()
      .duration(50)
      .addElement(this.appSideMenu.nativeElement)
      .afterAddClass('menu-shadow-content');

    this.itemSlideIn = this.animationCtrl
      .create()
      .addElement(document.querySelector('.toggle-item'))
      .duration(200)
      .beforeAddClass('sm-main-item');

    await this.hideContent.play();
    await this.showShadowContent.play();
    await this.itemSlideIn.play();
  }

  public async closeMenuAnimation(): Promise<void> {
    const el = document.querySelector('#main-container-ro');
    this.showContent = this.animationCtrl
      .create()
      .addElement(el)
      .duration(200)
      .beforeRemoveClass('side-menu-collapse-content');

    this.hideShadowContent = this.animationCtrl
      .create()
      .addElement(this.appSideMenu.nativeElement)
      .beforeRemoveClass('menu-shadow-content');
    await this.showContent.play();
    await this.hideShadowContent.play();
  }

  public redirect(url: string, isExternal: boolean = false): void {
    if (!!url && isExternal) {
      this.iab.create(url, this.platform.is('android') ? '_system' : '_blank');
    } else {
      !!url &&
        this.navCtrl.navigateRoot([url], { animationDirection: 'forward' });
    }
  }

  public logout(): void {
    this.facade.logout();
  }
}
