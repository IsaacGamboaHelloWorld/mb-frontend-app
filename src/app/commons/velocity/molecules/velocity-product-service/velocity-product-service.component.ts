import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';

import { IProductDetailService } from '@modules/detail/product-detail/entities/product-detail.entities';

@Component({
  selector: 'velocity-product-service',
  templateUrl: './velocity-product-service.component.html',
  styleUrls: ['./velocity-product-service.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VelocityProductServiceComponent {
  @Input() service: IProductDetailService;
  @Output() actionClick: EventEmitter<void> = new EventEmitter<void>();

  get hasImage(): boolean {
    return !!this.service?.img || this.service?.img !== '';
  }

  public emmitEvent(): void {
    !this.service.disabled && this.actionClick.emit();
  }
}
