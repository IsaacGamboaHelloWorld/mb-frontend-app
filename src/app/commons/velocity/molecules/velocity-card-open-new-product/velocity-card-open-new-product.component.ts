import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'velocity-card-open-new-product',
  templateUrl: './velocity-card-open-new-product.component.html',
  styleUrls: ['./velocity-card-open-new-product.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class VelocityCardOpenNewProductComponent {
  @Input() img: string;
  @Input() title: string;
  @Input() idButton: string = '';
  @Input() description: string;
  @Input() textLink: string;
  @Input() positionImg: 'left' | 'right' = 'left';
  @Input() backgroundColor: 'orange' | 'green' = 'orange';
  @Output() actionButton: EventEmitter<void> = new EventEmitter();

  get hasImg(): boolean {
    return !!this.img;
  }
}
