import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';

import {
  IMovements,
  ItemMovement
} from '@modules/detail/product-detail/entities/movements.entities';
import { trackBy } from '@commons/helpers/trackBy.helper';
import { IRange } from '@modules/detail/product-detail/entities/product-detail.entities';

@Component({
  selector: 'app-cont-movements',
  templateUrl: './cont-movements.component.html',
  styleUrls: ['./cont-movements.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContMovementsComponent {
  @Input() movements: IMovements;
  @Input() title: string;
  @Input() showSearch: boolean = true;
  @Output() loadMovements: EventEmitter<IRange> = new EventEmitter<IRange>();
  @Output() showFilters: EventEmitter<Event> = new EventEmitter<Event>();

  public loadings: number = 6;

  get hasMovements(): boolean {
    return this.movements?.list?.length > 0;
  }

  public trackByMovements(index: number, movement: ItemMovement): string {
    return trackBy(movement, movement.title);
  }
}
