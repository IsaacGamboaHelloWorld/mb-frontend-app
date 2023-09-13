import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { BlockProductsFacade } from '@modules/block-product/block-products.facade';
import { blockCreditCardMapper } from '@modules/block-product/mappers/block-product.mapper';
import { ModalService } from '@commons/services/modal.service';

@Component({
  selector: 'app-modal-block',
  templateUrl: './modal-block.component.html',
  styleUrls: ['./modal-block.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [BlockProductsFacade, FormBuilder]
})
export class ModalBlockComponent implements OnInit {
  @Input() id: string;
  @Input() typeAccount: string;
  public formBlock: FormGroup;
  constructor(
    public modalService: ModalService,
    private facade: BlockProductsFacade,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this._initForm();
  }

  get isLoading$(): Observable<boolean> {
    return this.facade.blockProduct$.pipe(map((data) => data.loading));
  }

  get typeBlock(): AbstractControl {
    return this.formBlock.get('typeBlock');
  }

  public blockProduct(): void {
    this.facade.fetchBlockProduct(
      blockCreditCardMapper(this.id, this.typeAccount, 'LOSS_LOCK')
    );
  }

  public submitForm(): void {
    if (this.formBlock.valid) {
      this.facade.fetchBlockProduct(
        blockCreditCardMapper(this.id, this.typeAccount, this.typeBlock.value)
      );
    }
  }

  private _initForm(): void {
    this.formBlock = this.fb.group({
      typeBlock: [null, Validators.required]
    });
  }
}
