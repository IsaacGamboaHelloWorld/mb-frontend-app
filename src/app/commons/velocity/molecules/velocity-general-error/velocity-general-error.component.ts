import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'velocity-general-error',
  templateUrl: './velocity-general-error.component.html',
  styleUrls: ['./velocity-general-error.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class VelocityGeneralErrorComponent {
  @Input() title: string;
  @Input() img: string;
  @Input() btn: string;
  @Output() actionBtn: EventEmitter<void> = new EventEmitter<void>();

  get hasBtn(): boolean {
    return !!this.btn;
  }
}
