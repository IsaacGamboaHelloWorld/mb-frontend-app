import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { Validators } from '@angular/forms';
import { first, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import {
  ICostTransferState,
  IRegisteredAccountState
} from '@modules/transfer/store/transfer.state';
import { ITypeBank } from '@commons/entities/type-bank.entities';
import { typeBankMapper } from '@modules/transfer/new-transfer/mappers/type-bank.mapper';
import { IRegisteredAccount } from '@modules/transfer/entities/registered-account.entities';
import { newTransferFromValidator } from '@modules/transfer/helpers/transfer.validators';
import { PropertyTemplate } from '@commons/velocity/templates/utils/constants/urls-template.constant';
import { costTransferMapper } from '@modules/transfer/new-transfer/mappers/cost.mapper';
import { ToWhoTransferAbstract } from '@modules/transfer/utils/to-who-transfer.abstract';
import { trackBy } from '@commons/helpers/trackBy.helper';

@Component({
  selector: 'app-to-who',
  templateUrl: './to-who.component.html',
  styleUrls: ['./to-who.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToWhoComponent extends ToWhoTransferAbstract implements OnInit {
  @ViewChild('hiddenElement', { static: true })
  public hiddenElement: any;
  public loading: number = 3;
  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this._initForm();
  }

  get registeredAccounts(): Observable<IRegisteredAccountState> {
    return this.facade.registeredAccount$.pipe(
      map((data) => ({
        ...data,
        products: data?.products?.filter(
          (product) =>
            !(
              product.destinationAccountId === this.from?.value?.id &&
              product?.destinationAccountType === this.from?.value?.typeAccount
            )
        )
      }))
    );
  }

  get hasRegisteredAccounts$(): Observable<boolean> {
    return this.registeredAccounts.pipe(
      map((data) => data?.products?.length > 0)
    );
  }

  get to(): AbstractControl {
    return this.formNewTransferToWho.get('to');
  }

  get cost$(): Observable<ICostTransferState> {
    return this.facade.costTransfer$;
  }

  public typeBank(product: IRegisteredAccount): ITypeBank {
    return typeBankMapper.bind(this)(product);
  }

  public changeTo(el: CustomEvent): void {
    const {
      detail: { value }
    } = el;
    if (!!value) {
      this._fetchCost(value);
      this.configTemplate.config.ionContent?.scrollToBottom(400);
    }
  }

  public trackByTo(index: number, product: IRegisteredAccount): string {
    return trackBy(product, product.destinationAccountId);
  }

  public change(el: CustomEvent): void {
    const {
      detail: { value }
    } = el;
    this.facade.resetRegistered();
    this.facade.resetCost();
    this.formNewTransferToWho.controls['to'].setValue(null);
    this.facade.fetchRegisteredAccount(value?.id, value?.typeAccount);
  }

  public fetchAffiliations(): void {
    this.facade.fetchRegisteredAccount(
      this.formNewTransferToWho.value?.from?.id,
      this.formNewTransferToWho?.value?.from?.typeAccount
    );
  }

  public submitForm(): void {
    if (this.formNewTransferToWho.valid) {
      this.cost$.pipe(first()).subscribe((data) => {
        this.saveDataTemplateService.saveDataTemplate({
          ...this.saveDataTemplateService.dataTemplate,
          toWho: {
            ...this.formNewTransferToWho.value,
            constTransaction: data?.information?.cost
          },
          stepActive: PropertyTemplate.howMuch
        });
        this.configTemplate.changeStep(this.configTemplate.config.router[1]);
      });
    }
  }

  private _fetchCost(to: CustomEvent): void {
    if (!!this.formNewTransferToWho.value?.from && !!to) {
      this.facade.fetchCost(
        costTransferMapper(this.formNewTransferToWho.value?.from, to as any)
      );
    }
  }

  private _initForm(): void {
    this.formNewTransferToWho = this.fb.group({
      from: [
        this.saveDataTemplateService.dataTemplate?.toWho?.from || null,
        [Validators.required, newTransferFromValidator.bind(this)]
      ],
      to: [
        this.saveDataTemplateService.dataTemplate?.toWho?.to || null,
        [Validators.required]
      ]
    });
    !this.saveDataTemplateService?.dataTemplate?.toWho?.from &&
      this.loadSelectedProduct(
        this.formNewTransferToWho,
        'from',
        this.products$
      )
        .pipe(first())
        .subscribe((product) => {
          if (!!product) {
            this.formNewTransferToWho.controls['from'].markAsTouched();
            this.facade.fetchRegisteredAccount(
              product?.id,
              product?.typeAccount
            );
          }
        });
  }
}
