import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';

import { trackBy } from '@commons/helpers/trackBy.helper';
import { IMovements, ItemMovement } from '../../entities/movements.entities';

@Component({
  selector: 'app-movements-filter',
  templateUrl: './movements-filter.component.html',
  styleUrls: ['./movements-filter.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovementsFilterComponent {
  @Input() movements: IMovements;
  @Output() loadMovements: EventEmitter<Event> = new EventEmitter<Event>();
  @Output() cancel: EventEmitter<Event> = new EventEmitter<Event>();

  public search: string = '';
  public searchDate: 'day' | 'week' | 'month' | '' = '';

  get hasMovements(): boolean {
    return this.movements?.list?.length > 0;
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
      (operator ? filterResult.length === 0 : filterResult.length > 0)
    );
  }

  public trackByMovements(index: number, movement: ItemMovement): string {
    return trackBy(movement, movement.title);
  }

  public resetDate(): void {
    this.searchDate = '';
  }
}
