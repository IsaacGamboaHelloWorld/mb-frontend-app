import { first, map } from 'rxjs/operators';

import { PRODUCT_DETAIL_TYPE_SERVICES } from '@modules/detail/product-detail/constants/product-detail-services.constant';
import {
  ADVANCES,
  DOCUMENTS_CERTIFICATES_DETAIL,
  DOCUMENTS_STATEMENTS_DETAIL,
  DOCUMENTS_TAX_CERTIFICATES_CERT_TC,
  EXPERIENCE,
  HOME_PAYMENT,
  HOME_TRANSFER,
  NEW_PAYMENT_LOANS,
  OPEN_ACCOUNT_CUSTOM,
  POCKETS_HOME,
  POCKETS_ONBOARDING,
  RECHARGES,
  TRANSFER_WITHDRAWALS
} from '@commons/constants/navigatie-global';
import {
  TYPE_ACCOUNTS,
  TYPE_CREDIT_CARD
} from '@commons/constants/types_account';
import { ADVANCE_LIMITS, KEYS } from '@commons/constants/global';
import { ContModalRedirectComponent } from '@modules/detail/product-detail/components/cont-modal-redirect/cont-modal-redirect.component';
import { AdlSecureStorageService } from '@commons/services/adl-security-storage.service';
import { Product } from '@commons/models/product.model';
import { URLS_OPEN_NEW_PRODUCT } from '@commons/constants/open-new-products';
import { ModalGenericComponent } from '@commons/components/modal-generic/modal-generic.component';
import { MinAmountTransactions } from '@commons/constants/min-amount-transactions';
import { IProductDetailService } from '@modules/detail/product-detail/entities/product-detail.entities';

const saveAccount = (
  method: AdlSecureStorageService,
  id: string,
  type: string,
  key: string = KEYS.ACTIVE_PRODUCT
): Promise<boolean> => {
  return method.put(
    key,
    JSON.stringify({
      id,
      type
    })
  );
};

const validateAccount = (product: Product, property: string): boolean => {
  return (
    product.enabled &&
    product.status === TYPE_CREDIT_CARD.ACTIVE &&
    product.productAccountBalances[property]?.amount > ADVANCE_LIMITS.MIN
  );
};

function modalAdvance(product: Product): void {
  this.modalService.openModal(ContModalRedirectComponent, {
    title: this.translateService.instant('DETAIL.MODAL_ADVANCES.TITLE'),
    description: this.translateService.instant(
      'DETAIL.MODAL_ADVANCES.DESCRIPTION',
      {
        description: `${
          this.typeCreditCard.transform(this.productBasic.id)?.name
        }  ${this.productBasic.id?.slice(-4)}`
      }
    ),
    firstBtn: this.translateService.instant('DETAIL.MODAL_ADVANCES.BTN_FIRST'),
    secondBtn: this.translateService.instant(
      'DETAIL.MODAL_ADVANCES.BTN_SECOND'
    ),
    id: product.id,
    amount: product.productAccountBalances.cupo_disponible_avances_pesos.amount,
    areButtonsWidthComplete: true,
    type: this.productBasic.type
  });
}

function minAmountModal(): void {
  this.modalService.openModal(
    ModalGenericComponent,
    {
      icon: 'icon-vel-face-wrong',
      iconType: 'error',
      title: this.translateService.instant('MODALS.MIN_AMOUNT.TITLE'),
      description: this.translateService.instant(
        'MODALS.MIN_AMOUNT.DESCRIPTION'
      ),
      firstBtn: this.translateService.instant('UNDERSTOOD')
    },
    'default-modal'
  );
}

export async function serviceRedirectDetail(
  service: IProductDetailService,
  product: Product,
  storage: AdlSecureStorageService
): Promise<void> {
  if (service?.hasPermissions) {
    switch (service?.type) {
      case PRODUCT_DETAIL_TYPE_SERVICES.CERTIFICATE.type:
      case PRODUCT_DETAIL_TYPE_SERVICES.CERTIFICATE_TC.type:
      case PRODUCT_DETAIL_TYPE_SERVICES.WITHDRAWN_WITHOUT_CARD.type:
      case PRODUCT_DETAIL_TYPE_SERVICES.MOBILE_RECHARGES.type:
        await saveAccount(
          this.securityStorageService,
          this.productBasic.id,
          this.productBasic.type
        );
        break;
      case PRODUCT_DETAIL_TYPE_SERVICES.PAYMENT_OBLIGATION_CREDIT_CARD.type:
        this.facade.setCreditCard({
          id: this.productBasic.id,
          type: this.productBasic.type
        });
    }

    switch (service?.type) {
      case PRODUCT_DETAIL_TYPE_SERVICES.CERTIFICATE.type:
        this.navCtrl.navigateForward([DOCUMENTS_CERTIFICATES_DETAIL]);
        break;
      case PRODUCT_DETAIL_TYPE_SERVICES.CERTIFICATE_TC.type:
        this.navCtrl.navigateForward([DOCUMENTS_TAX_CERTIFICATES_CERT_TC]);
        break;
      case PRODUCT_DETAIL_TYPE_SERVICES.STATEMENT.type:
        this.navCtrl.navigateForward([DOCUMENTS_STATEMENTS_DETAIL]);
        break;
      case PRODUCT_DETAIL_TYPE_SERVICES.PAYMENT_OBLIGATION_CREDIT_CARD.type:
        this.navCtrl.navigateForward([NEW_PAYMENT_LOANS]);
        break;
      case PRODUCT_DETAIL_TYPE_SERVICES.WITHDRAWN_WITHOUT_CARD.type:
        product?.productAccountBalances?.saldo_disponible?.amount >=
        MinAmountTransactions.transferWithdrawal
          ? this.navCtrl.navigateForward([TRANSFER_WITHDRAWALS])
          : minAmountModal.bind(this)();
        break;
      case PRODUCT_DETAIL_TYPE_SERVICES.PAYMENT_OBLIGATION.type:
        product?.productAccountBalances?.saldo_disponible?.amount >=
        MinAmountTransactions.payment
          ? this.navCtrl.navigateForward([HOME_PAYMENT])
          : minAmountModal.bind(this)();
        break;
      case PRODUCT_DETAIL_TYPE_SERVICES.MOBILE_RECHARGES.type:
        product?.productAccountBalances?.saldo_disponible?.amount >=
        MinAmountTransactions.recharge
          ? this.navCtrl.navigateForward([RECHARGES])
          : minAmountModal.bind(this)();
        break;
      case PRODUCT_DETAIL_TYPE_SERVICES.TRANSFER_ACCOUNTS.type:
        product?.productAccountBalances?.saldo_disponible?.amount >=
        MinAmountTransactions.transfer
          ? this.navCtrl.navigateForward([HOME_TRANSFER])
          : minAmountModal.bind(this)();
        break;
      case PRODUCT_DETAIL_TYPE_SERVICES.ADVANCE.type:
        if (validateAccount(product, 'cupo_disponible_avances_pesos')) {
          await saveAccount(
            this.securityStorageService,
            this.productBasic.id,
            this.productBasic.type
          );
          this.navCtrl.navigateForward([ADVANCES]);
        } else {
          this.facade
            .filterProducts$([TYPE_ACCOUNTS.CREDIT_CARD])
            .pipe(
              first(),
              map((products: Product[]) =>
                products.filter((data) =>
                  validateAccount(data, 'cupo_disponible_avances_pesos')
                )
              )
            )
            .subscribe((data) =>
              data?.length > 0
                ? modalAdvance.bind(this)(data[0])
                : this.navCtrl.navigateForward([
                    OPEN_ACCOUNT_CUSTOM,
                    URLS_OPEN_NEW_PRODUCT.ADVANCE
                  ])
            );
        }
        break;
      case PRODUCT_DETAIL_TYPE_SERVICES.POCKETS.type:
        !Boolean(await storage.get(KEYS.SHOW_ONBOARDING_POCKETS))
          ? this.navCtrl.navigateForward([POCKETS_ONBOARDING])
          : this.navCtrl.navigateForward([POCKETS_HOME]);
    }
  } else {
    this.navCtrl.navigateForward([EXPERIENCE]);
  }
}
