import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation
} from '@angular/core';
import { ItuplusBankPoints } from '@modules/tuplus/mappers/tuplus-banks-points.mapper';

@Component({
  selector: 'velocity-detail-points-bank',
  templateUrl: './velocity-detail-points-bank.component.html',
  styleUrls: ['./velocity-detail-points-bank.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VelocityDetailPointsBankComponent {
  @Input() detailBanksPoints: ItuplusBankPoints;
  constructor() {}

  get bankBackground(): string {
    return this.detailBanksPoints?.bank?.toLowerCase();
  }
}
