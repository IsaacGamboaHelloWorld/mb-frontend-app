import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'velocity-card-custom',
  templateUrl: './velocity-card-custom.component.html',
  styleUrls: ['./velocity-card-custom.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VelocityCardCustomComponent {
  @Input() img: string;
  @Input() name: string;

  get hasImg(): boolean {
    return !!this?.img;
  }
}
