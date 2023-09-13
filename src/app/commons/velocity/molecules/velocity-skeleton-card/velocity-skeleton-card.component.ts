import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'velocity-skeleton-card',
  templateUrl: './velocity-skeleton-card.component.html',
  styleUrls: ['./velocity-skeleton-card.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class VelocitySkeletonCardComponent {}
