import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'velocity-card-credit-card',
  templateUrl: './velocity-card-credit-card.component.html',
  styleUrls: ['./velocity-card-credit-card.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class VelocityCardCreditCardComponent {
  @Input() title: string;
  @Input() chip: string;
  @Input() img: string;
  @Input() type: string;
  @Input() number: string;
  @Input() date: string;
  @Input() titleDate: string;
  @Input() point: string = '•';
  @Input() textOption: string;
  @Input() isDynamicNumber: boolean = false;
  @Input() howManyPoints: number = 4;
  @Input() howManySections: number = 3;
  @Output() actionOptions: EventEmitter<void> = new EventEmitter<void>();

  get hasOption(): boolean {
    return !!this.textOption;
  }
}
