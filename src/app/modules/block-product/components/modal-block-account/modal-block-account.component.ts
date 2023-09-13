import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation
} from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ModalService } from '@commons/services/modal.service';
import { STATUS_BUTTONS } from '@commons/velocity/templates/utils/entities/config.entities';
import { BlockProductsFacade } from '@modules/block-product/block-products.facade';
import { blockCreditCardMapper } from '@modules/block-product/mappers/block-product.mapper';

@Component({
  selector: 'app-modal-block-account',
  templateUrl: './modal-block-account.component.html',
  styleUrls: ['./modal-block-account.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [BlockProductsFacade]
})
export class ModalBlockAccountComponent {
  constructor(
    public modalService: ModalService,
    public facade: BlockProductsFacade
  ) {}

  get isLoading$(): Observable<boolean> {
    return this.facade.blockProduct$.pipe(map((data) => data.loading));
  }

  get props(): any {
    return this.modalService?.modal?.componentProps;
  }

  get typeButtons(): typeof STATUS_BUTTONS {
    return STATUS_BUTTONS;
  }

  public blockProduct(): void {
    this.facade.fetchBlockProduct(
      blockCreditCardMapper(this.props?.id, this.props?.type, 'TEMPORARY_LOCK')
    );
  }

  public actionButton(type: string): void {
    this.modalService.setActionButton(type);
  }
}
