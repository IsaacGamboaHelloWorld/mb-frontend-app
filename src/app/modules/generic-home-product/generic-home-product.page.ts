import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation
} from '@angular/core';
import { NavController } from '@ionic/angular';

import { IGenericHome } from '@app/commons/entities/generic-home-product-entities';
import { GenericHomeService } from '@app/commons/utils/generic-home.service';

@Component({
  selector: 'app-generic-home-product',
  templateUrl: './generic-home-product.page.html',
  styleUrls: ['./generic-home-product.page.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenericHomeProductPage {
  constructor(
    private navCtrl: NavController,
    private genericHomeService: GenericHomeService
  ) {}

  get genericHome(): IGenericHome {
    return this.genericHomeService.items;
  }

  get typeHome(): string {
    return this.genericHomeService.items?.type;
  }

  public back(): void {
    this.navCtrl.navigateRoot(['/']);
  }

  public redirect(event: { enable: boolean; url: string }): void {
    event?.enable && !!event?.url && this.navCtrl.navigateRoot([event?.url]);
  }
}
