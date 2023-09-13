import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation
} from '@angular/core';
import { IDetailMovement } from '@modules/tuplus/mappers/movements-tuplus.mapper';

@Component({
  selector: 'velocity-movement-by-bank',
  templateUrl: './velocity-movement-by-bank.component.html',
  styleUrls: ['./velocity-movement-by-bank.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class VelocityMovementByBankComponent {
  @Input() detailMovement: IDetailMovement;

  constructor() {}

  get typeRedeem(): string {
    return this.detailMovement?.type?.toLowerCase();
  }

  get bankBackground(): string {
    return this.detailMovement?.bank?.toLowerCase();
  }
}
