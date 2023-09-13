import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { ICard } from '@commons/entities/card.entities';

@Component({
  selector: 'velocity-card',
  templateUrl: './velocity-card.component.html',
  styleUrls: ['./velocity-card.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VelocityCardComponent {
  @Input() product: ICard;
  @Input() id: string;
  @Input() class: string = '';
  @Input() footer: TemplateRef<any>;
  @Input() iconType: 'success' | 'information' | 'warning' | 'error' =
    'success';
  @Input() hiddenIcon: string;
  @Input() showHidden: boolean = false;
  @Output() retry: EventEmitter<void> = new EventEmitter<void>();
  @Output() viewDetail: EventEmitter<void> = new EventEmitter<void>();
  @Output() toogleHiddenId: EventEmitter<void> = new EventEmitter<void>();

  get hasProduct(): boolean {
    return this.product?.success && !!this.product?.content?.amount;
  }

  get hasImg(): boolean {
    return !!this.product?.img;
  }

  get hasLink(): boolean {
    return !!this.product?.content?.link;
  }

  get hasAmountSmall(): boolean {
    return !!this.product?.content?.amountSmall;
  }
}
