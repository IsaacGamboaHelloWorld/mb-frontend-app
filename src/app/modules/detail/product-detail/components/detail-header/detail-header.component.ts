import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';

import { IProductDetailInformation } from '@modules/detail/product-detail/entities/product-detail.entities';

@Component({
  selector: 'app-detail-header',
  templateUrl: './detail-header.component.html',
  styleUrls: ['./detail-header.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailHeaderComponent {
  @Input() product: IProductDetailInformation;
  @Input() showHidden: boolean = false;
  @Input() hiddenIcon: string;
  @Output() toogleHiddenId: EventEmitter<void> = new EventEmitter<void>();
  get hasIcon(): boolean {
    return !!this.product?.icon;
  }

  get hasStatus(): boolean {
    return !!this.product?.status;
  }
}
