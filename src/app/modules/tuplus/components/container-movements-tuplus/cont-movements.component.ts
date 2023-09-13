import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';

import { IRange } from '@modules/detail/product-detail/entities/product-detail.entities';

@Component({
  selector: 'app-container-movements-tuplus',
  templateUrl: './cont-movements.component.html',
  styleUrls: ['./cont-movements.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ContainerMovementsComponent {
  @Output() showFilters: EventEmitter<Event> = new EventEmitter<Event>();
  @Input() movements;
  @Output() loadMovements: EventEmitter<IRange> = new EventEmitter<IRange>();
  public loadings: number = 6;

  get lengthMovements(): number {
    return this.movements?.information?.ListTransactions?.length;
  }

  get hasMovements(): boolean {
    return !!this.lengthMovements && this.lengthMovements > 0;
  }
}
