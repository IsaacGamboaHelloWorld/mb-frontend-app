import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'velocity-info-with-lines',
  templateUrl: './velocity-info-with-lines.component.html',
  styleUrls: ['./velocity-info-with-lines.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VelocityInfoWithLinesComponent {
  @Input() text: string;
  @Output() actionClick: EventEmitter<void> = new EventEmitter<void>();
  constructor() {}
}
