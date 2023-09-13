import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'velocity-card-pockets',
  templateUrl: './velocity-card-pockets.component.html',
  styleUrls: ['./velocity-card-pockets.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class VelocityCardPocketsComponent {
  @Input() textHave: string;
  @Input() textGoal: string;
  @Input() textAutomaticDebit: string;
  @Input() textBtnMove: string;
  @Input() textBtnEdit: string;
  @Input() pocketName: string;
  @Input() typePocket: string;
  @Input() savingGoal: string;
  @Input() amountSaved: string;
  @Input() goalIsAccomplished: boolean;
  @Input() loading: boolean;
  @Input() average: number;
  @Input() pocketPeriodDescription: string;
  @Output() buttonMove: EventEmitter<void> = new EventEmitter<void>();
  @Output() buttonEdit: EventEmitter<void> = new EventEmitter<void>();

  get icon(): string {
    return this.typePocket === 'Ahorro'
      ? 'icon-vel-rocket'
      : 'icon-vel-calendar';
  }
}
