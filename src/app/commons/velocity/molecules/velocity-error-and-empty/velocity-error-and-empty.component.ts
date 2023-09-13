import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'velocity-error-and-empty',
  templateUrl: './velocity-error-and-empty.component.html',
  styleUrls: ['./velocity-error-and-empty.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class VelocityErrorAndEmptyComponent {
  @Input() icon: { type: string; name: string };
  @Input() buttonText: string;
  @Input() title: string;
  @Output() actionButton: EventEmitter<void> = new EventEmitter();

  get hasIcon(): boolean {
    return !!this.icon;
  }

  get hasButton(): boolean {
    return !!this.buttonText;
  }
}
