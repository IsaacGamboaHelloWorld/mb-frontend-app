import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'velocity-card-account',
  templateUrl: './velocity-card-account.component.html',
  styleUrls: ['./velocity-card-account.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VelocityCardAccountComponent {
  @Input() accountIcon: string;
  @Input() title: string;
  @Input() number: string;
  @Input() descriptionAmount: string;
  @Input() amount: string;
  @Input() textOption: string;
  @Input() typeCard: string;
  @Output() clickOption: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  get hasOption(): boolean {
    return !!this.textOption;
  }

  public validateType(type: string): boolean {
    return this.typeCard === type;
  }
}
