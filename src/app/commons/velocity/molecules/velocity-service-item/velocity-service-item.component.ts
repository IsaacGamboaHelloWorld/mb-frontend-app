import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'velocity-service-item',
  templateUrl: './velocity-service-item.component.html',
  styleUrls: ['./velocity-service-item.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VelocityServiceItemComponent {
  @Input() icon: string;
  @Input() iconType: 'success' | 'information' | 'warning' | 'error' =
    'warning';
  @Input() title: string;
  @Input() subtitle?: string;

  constructor() {}
}
