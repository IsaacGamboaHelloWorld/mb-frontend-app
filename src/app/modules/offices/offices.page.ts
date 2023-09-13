import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { NavController } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';

import { HOME } from '@commons/constants/navigatie-global';

@Component({
  selector: 'app-offices',
  templateUrl: './offices.page.html',
  styleUrls: ['./offices.page.sass'],
  encapsulation: ViewEncapsulation.None
})
export class OfficesPage implements OnInit {
  constructor(private navCtrl: NavController) {}

  ngOnInit(): void {
    Capacitor.getPlatform() !== 'web' && this.getCurrentPosition();
  }

  public back(): void {
    this.navCtrl.navigateRoot([HOME]);
  }

  public async getCurrentPosition(): Promise<void> {
    try {
      await Geolocation.getCurrentPosition();
    } catch (error) {}
  }
}
