import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation
} from '@angular/core';

import { IFinance } from '@modules/home/entities/finances.entities';

@Component({
  selector: 'velocity-card-finance',
  templateUrl: './velocity-card-finance.component.html',
  styleUrls: ['./velocity-card-finance.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VelocityCardFinanceComponent {
  @Input() finance: IFinance;
}
