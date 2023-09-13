import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';

import { ICardSmallEntities } from '@commons/entities/card-small.entities';

@Component({
  selector: 'velocity-small-card',
  templateUrl: './velocity-small-card.component.html',
  styleUrls: ['./velocity-small-card.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VelocitySmallCardComponent {
  @Input() product: ICardSmallEntities;
  @Input() isError: boolean = false;
  @Input() showButton: boolean = true;
  @Input() idButton: string = '';
  @Output() actionBtn: EventEmitter<void> = new EventEmitter<void>();
}
