import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { FormControl } from '@angular/forms';

import { randomText } from '@commons/helpers/random-text.helper';

@Component({
  selector: 'velocity-checkbox-slide',
  templateUrl: './velocity-checkbox-slide.component.html',
  styleUrls: ['./velocity-checkbox-slide.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VelocityCheckboxSlideComponent {
  @Input() control: FormControl;
  @Input() id: string = randomText();
  @Input() check: boolean = false;
  @Input() text: string;
  @Input() size: string;
  @Input() disabled: boolean = false;
  @Output() stateCheck: EventEmitter<void> = new EventEmitter<void>();

  get hasText(): boolean {
    return !!this.text;
  }

  public toggleCheck(): void {
    !this.disabled && this.stateCheck.emit();
  }
}
