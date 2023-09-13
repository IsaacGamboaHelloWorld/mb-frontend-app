import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';

import { trackBy } from '@commons/helpers/trackBy.helper';
import {
  IProductDetailInformation,
  ItemList
} from '@modules/detail/product-detail/entities/product-detail.entities';
import { ModalService } from '@commons/services/modal.service';

@Component({
  selector: 'velocity-product-detail-card',
  templateUrl: './velocity-product-detail-card.component.html',
  styleUrls: ['./velocity-product-detail-card.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class VelocityProductDetailCardComponent {
  @Input() product: IProductDetailInformation;
  @Input() footnotes: string = '';
  @Input() btn: string;
  @Output() goUrl: EventEmitter<void> = new EventEmitter<void>();

  constructor(private modalService: ModalService) {}

  get hasContentDescription(): boolean {
    return !!this.product?.content?.description;
  }

  get hasBtn(): boolean {
    return !!this.btn;
  }

  get hasImg(): boolean {
    return !!this.product?.img;
  }

  get hasFootnotes(): boolean {
    return this.footnotes !== '';
  }

  public trackByList(index: number, list: ItemList): string {
    return trackBy(list, list.title);
  }

  public closeModal(): void {
    this.modalService.close();
  }
}
