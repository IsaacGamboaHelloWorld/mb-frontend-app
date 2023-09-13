import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  Input,
  EventEmitter,
  Output
} from '@angular/core';

@Component({
  selector: 'velocity-link',
  templateUrl: './velocity-link.component.html',
  styleUrls: ['./velocity-link.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VelocityLinkComponent {
  @Input() isLoading: boolean = false;
  @Input() disabled: boolean = false;
  @Input() text: string = '';
  @Input() class: string = '';
  @Input() id: string = '';
  @Output() actionButton: EventEmitter<void> = new EventEmitter<void>();

  public emit(): void {
    !this.disabled && this.actionButton.emit();
  }
}
