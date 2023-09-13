import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation
} from '@angular/core';
import { ModalService } from '@commons/services/modal.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-modal-product-block',
  templateUrl: './modal-product-block.component.html',
  styleUrls: ['./modal-product-block.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ModalProductBlockComponent {
  @Input() title: string;
  @Input() icon: string;
  @Input() close: boolean = false;
  @Input() iconType: 'success' | 'information' | 'warning' | 'error' =
    'success';
  @Input() subtitle: string;
  @Input() descriptionOne: string;
  @Input() descriptionTwo: string;
  @Input() link: string;
  @Input() linkText: string;
  @Input() buttonText: string;

  constructor(public modalService: ModalService, private iab: InAppBrowser) {}

  get hasSubtitle(): boolean {
    return !!this.subtitle;
  }

  get hasIcon(): boolean {
    return !!this.icon;
  }

  get hasLink(): boolean {
    return !!this.link;
  }

  openBrowser(): void {
    this.iab.create(this.link, '_blank');
  }
}
