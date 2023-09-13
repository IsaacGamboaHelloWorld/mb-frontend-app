import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';

import { trackBy } from '@app/commons/helpers/trackBy.helper';
import { ItemMovement } from '@app/modules/detail/product-detail/entities/movements.entities';
import { IMovementTuplus } from '@modules/tuplus/entities/movement-tuplus.entities';

@Component({
  selector: 'app-movements-filter-tuplus',
  templateUrl: './movements-filter.component.html',
  styleUrls: ['./movements-filter.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MovementsFilterComponentTuplus {
  @Input() movements: IMovementTuplus;
  @Output() loadMovements: EventEmitter<Event> = new EventEmitter<Event>();
  @Output() cancel: EventEmitter<Event> = new EventEmitter<Event>();

  constructor() {}

  public search: string = '';
  public searchDate: 'day' | 'week' | 'month' | '' = '';

  get hasMovements(): boolean {
    return this.movements?.ListTransactions?.length > 0;
  }

  get hasSelectedDate(): boolean {
    return this.searchDate !== '';
  }

  get showWelcomeMsg(): boolean {
    return this.search === '' && this.searchDate === '';
  }

  public hideElement(filterResult: any, operator: boolean = false): boolean {
    return (
      (this.search !== '' || this.searchDate !== '') &&
      (operator ? filterResult?.length === 0 : filterResult?.length > 0)
    );
  }

  public trackByMovements(index: number, movement: ItemMovement): string {
    return trackBy(movement, movement.title);
  }

  public resetDate(): void {
    this.searchDate = '';
  }
}
