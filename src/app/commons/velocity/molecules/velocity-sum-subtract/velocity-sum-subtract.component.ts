import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'velocity-sum-subtract',
  templateUrl: './velocity-sum-subtract.component.html',
  styleUrls: ['./velocity-sum-subtract.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VelocitySumSubtractComponent {
  @Input() counter: number;
  @Input() sumDisabled: boolean = false;
  @Input() subtractDisabled: boolean = false;
  @Output() emmitSum: EventEmitter<void> = new EventEmitter<void>();
  @Output() emmitSubtract: EventEmitter<void> = new EventEmitter<void>();
  constructor() {}

  public sum(): void {
    !this.sumDisabled && this.emmitSum.emit();
  }

  public subtract(): void {
    !this.subtractDisabled && this.emmitSubtract.emit();
  }
}
