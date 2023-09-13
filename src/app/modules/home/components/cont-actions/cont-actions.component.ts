import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {
  IStockPeriod,
  IStocksAllParams,
  IStockType
} from '@modules/main-container/entities/stocks.interface';

@Component({
  selector: 'app-cont-actions',
  templateUrl: './cont-actions.component.html',
  styleUrls: ['./cont-actions.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContActionsComponent implements OnInit {
  @Input() periods: IStockPeriod[];
  @Input() types: IStockType[];
  @Input() loading: boolean;
  @Output() actionsStocks: EventEmitter<IStocksAllParams> = new EventEmitter<
    IStocksAllParams
  >();

  public formActions: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this._initForm();
  }

  public formSubmit(): void {
    if (this.formActions.valid) {
      this.actionsStocks.emit({
        period: this.formActions.value?.period,
        stockType: this.formActions.value?.type
      });
    }
  }

  private _initForm(): void {
    this.formActions = this.fb.group({
      period: [
        (this.periods && this.periods[0]?.id) || null,
        [Validators.required]
      ],
      type: [(this.types && this.types[0]?.id) || null, Validators.required]
    });
  }
}
