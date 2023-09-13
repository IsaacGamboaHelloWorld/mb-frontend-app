import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'velocity-section-other-products',
  templateUrl: './velocity-section-other-products.component.html',
  styleUrls: ['./velocity-section-other-products.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VelocitySectionOtherProductsComponent {
  @Input() title: string;
  @Input() description: string;
  @Input() img: string;
  @Input() check: boolean;
  @Input() disabled: boolean = false;
  @Output() actionClick: EventEmitter<void> = new EventEmitter<void>();

  get hasImg(): boolean {
    return !!this.img;
  }
}
