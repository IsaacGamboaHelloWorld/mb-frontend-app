import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'velocity-transaction-cost',
  templateUrl: './velocity-transaction-cost.component.html',
  styleUrls: ['./velocity-transaction-cost.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VelocityTransactionCostComponent {
  @Input() name: string;
  @Input() value: string;
  @Input() nameFees?: string;
  @Input() quantityFees?: string;
  @Input() loading: string;
  @Input() img: string;

  get hasValue(): boolean {
    return !!this.value;
  }

  get hasFee(): boolean {
    return !!this.quantityFees && !!this.nameFees;
  }
}
