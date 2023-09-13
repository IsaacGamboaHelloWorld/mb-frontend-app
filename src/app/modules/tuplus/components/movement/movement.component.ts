import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  Input,
  ViewEncapsulation
} from '@angular/core';

import { trackBy } from '@app/commons/helpers/trackBy.helper';
import { ItemMovementList } from '@app/modules/detail/product-detail/entities/movements.entities';
import { IListTransaction } from '@modules/tuplus/entities/movement-tuplus.entities';
import {
  IDetailMovement,
  detailMovementTuplusMapper
} from '@modules/tuplus/mappers/movements-tuplus.mapper';
import { TuplusAbstract } from '@modules/tuplus/utils/tuplus.abstract';

@Component({
  selector: 'app-movement',
  templateUrl: './movement.component.html',
  styleUrls: ['./movement.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MovementComponent extends TuplusAbstract {
  @Input() movement: IListTransaction;

  constructor(protected injector: Injector) {
    super(injector);
  }

  public setDetailTuplus(mov): IDetailMovement {
    return detailMovementTuplusMapper(mov, this.translateService);
  }

  public trackBy(index: number, movement: ItemMovementList): string {
    return trackBy(movement, movement.title);
  }
}
