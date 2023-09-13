import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'velocity-toggle-label',
  templateUrl: './velocity-toggle-label.component.html',
  styleUrls: ['./velocity-toggle-label.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VelocityToggleLabelComponent {
  @Input() textOne: string;
  @Input() textTwo: string;
  @Input() check: boolean = false;
  @Input() control: FormControl;
  @Output() actionClick: EventEmitter<void> = new EventEmitter<void>();

  public setValue(): void {
    !!this.control
      ? this.control.setValue(!this.check)
      : this.actionClick.emit();
  }
}
