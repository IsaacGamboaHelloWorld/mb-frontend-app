import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';

import {
  IProductDetailInformation,
  ItemList
} from '@modules/detail/product-detail/entities/product-detail.entities';
import { trackBy } from '@commons/helpers/trackBy.helper';

@Component({
  selector: 'velocity-detail-info',
  templateUrl: './velocity-detail-info.component.html',
  styleUrls: ['./velocity-detail-info.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class VelocityDetailInfoComponent {
  @Input() product: IProductDetailInformation;
  @Input() showDetailText: string = '';
  @Input() contentLength: number = 4;
  @Output() seeMore: EventEmitter<void> = new EventEmitter<void>();
  @Output() viewPockets: EventEmitter<void> = new EventEmitter<void>();

  private _showContent: boolean = false;

  get showContent(): boolean {
    return this._showContent;
  }

  get hasContentDescription(): boolean {
    return !!this.product?.content?.description;
  }

  get showArrow(): boolean {
    return this.product?.content?.list.length > this.contentLength;
  }

  public trackByList(index: number, list: ItemList): string {
    return trackBy(list, list.title);
  }
}
