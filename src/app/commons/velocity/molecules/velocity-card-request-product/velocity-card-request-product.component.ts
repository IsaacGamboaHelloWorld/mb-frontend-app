import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'app-velocity-card-request-product',
  templateUrl: './velocity-card-request-product.component.html',
  styleUrls: ['./velocity-card-request-product.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VelocityCardRequestProductComponent {
  @Input() icon: string;
  @Input() iconType: 'success' | 'information' | 'warning' | 'error' =
    'success';
  @Input() productName: string;
  @Input() enabled: boolean = true;
  @Input() navigationIcon: string;
  @Input() value: string;
  @Output() selectedCard: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  get hasIcon(): boolean {
    return !!this.icon;
  }

  public actionCard(): void {
    !!this.enabled && this.selectedCard.emit(this.value);
  }
}
