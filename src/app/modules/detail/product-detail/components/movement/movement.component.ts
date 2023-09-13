import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation
} from '@angular/core';
import {
  ItemMovement,
  ItemMovementList
} from '@modules/detail/product-detail/entities/movements.entities';
import { trackBy } from '@commons/helpers/trackBy.helper';

@Component({
  selector: 'app-movement',
  templateUrl: './movement.component.html',
  styleUrls: ['./movement.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovementComponent {
  @Input() movement: ItemMovement;
  private _showList: boolean = false;

  get showList(): boolean {
    return this._showList;
  }

  get hasList(): boolean {
    return this.movement?.list?.length > 0;
  }

  public toggleList(): void {
    this._showList = !this._showList;
  }

  public trackBy(index: number, movement: ItemMovementList): string {
    return trackBy(movement, movement.title);
  }
}
