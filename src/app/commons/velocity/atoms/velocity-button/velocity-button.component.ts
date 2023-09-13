import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'velocity-button',
  templateUrl: './velocity-button.component.html',
  styleUrls: ['./velocity-button.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VelocityButtonComponent {
  @Input() isLoading: boolean = false;
  @Input() disabled: boolean = false;
  @Input() type: 'button' | 'submit' | 'reset' | 'text' = 'button';
  @Input() class: string = '';
  @Input() text: string = '';
  @Input() id: string = '';
  @Input() icon: string = '';

  @Output() actionButton: EventEmitter<void> = new EventEmitter<void>();

  get nameTypeClass() {
    return this.type === 'text' ? 'text' : 'btn';
  }
}
