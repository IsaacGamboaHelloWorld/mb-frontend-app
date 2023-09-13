import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { randomText } from '@commons/helpers/random-text.helper';

@Component({
  selector: 'velocity-checkbox',
  templateUrl: './velocity-checkbox.component.html',
  styleUrls: ['./velocity-checkbox.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VelocityCheckboxComponent {
  @Input() id: string = randomText();
  @Input() text: string;
  @Input() check: boolean = false;
  @Output() clickCheck: EventEmitter<boolean> = new EventEmitter<boolean>();
}
