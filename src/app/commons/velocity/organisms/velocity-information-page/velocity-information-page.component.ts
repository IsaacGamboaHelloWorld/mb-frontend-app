import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'velocity-information-page',
  templateUrl: './velocity-information-page.component.html',
  styleUrls: ['./velocity-information-page.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VelocityInformationPageComponent {
  @Input() img: string;
  @Input() text: string;
  @Input() title: string;
  @Input() btn: string;
  @Output() actionButton: EventEmitter<void> = new EventEmitter<void>();

  get hasBtn(): boolean {
    return !!this.btn;
  }

  get hasTitle(): boolean {
    return !!this.title;
  }
}
