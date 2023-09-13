import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';

import { ContactService } from '@modules/contacts/services/contact.service';
import { IContactService } from '@modules/contacts/contact.entities';
import { HOME } from '@commons/constants/navigatie-global';
// @ts-ignore
import contacts from '../../../assets/contacts.json';
import { AppLauncher } from '@capacitor/app-launcher';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.sass'],
  encapsulation: ViewEncapsulation.None
})
export class ContactsPage implements OnInit {
  public tells: IContactService;
  constructor(
    private contactService: ContactService,
    private nacCtrl: NavController
  ) {}

  ngOnInit(): void {
    this.tells = contacts;
  }

  public back(): void {
    this.nacCtrl.navigateRoot([HOME]);
  }

  public isFirst(index: number): boolean {
    return index === 0;
  }

  public setIcon(index: number): string {
    switch (index) {
      case 0:
        return 'icon-vel-essential-cellphone';
      case 1:
        return 'icon-vel-payments-finance-credit-card-2';
      case 2:
        return 'icon-vel-payments-finance-credit-card';
    }
    return '';
  }

  public isPlatform(platform: string): boolean {
    return Capacitor.getPlatform() === platform;
  }

  public async openApp(url: string): Promise<void> {
    try {
      const { value: hasApp } = await AppLauncher.canOpenUrl({ url });
      hasApp
        ? await AppLauncher.openUrl({ url })
        : window.open(
            Capacitor.getPlatform() === 'android'
              ? `https://play.google.com/store/apps/details?id=${url}`
              : `itms-apps://itunes.apple.com/app/${url}`,
            '_system',
            'location=no'
          );
    } catch {}
  }
}
