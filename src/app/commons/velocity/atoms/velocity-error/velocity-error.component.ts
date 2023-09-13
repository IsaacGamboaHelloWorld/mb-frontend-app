import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'velocity-error',
  templateUrl: './velocity-error.component.html',
  styleUrls: ['./velocity-error.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VelocityErrorComponent {
  @Input() text: string;
}
