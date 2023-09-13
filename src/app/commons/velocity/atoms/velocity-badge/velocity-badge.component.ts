import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'velocity-badge',
  templateUrl: './velocity-badge.component.html',
  styleUrls: ['./velocity-badge.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VelocityBadgeComponent {
  @Input() text: string;
}
