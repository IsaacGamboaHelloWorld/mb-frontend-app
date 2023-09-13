import {
  OPEN_ACCOUNT_CUSTOM,
  QR_ANNULMENT,
  QR_PAYMENT
} from '@commons/constants/navigatie-global';
import { URLS_OPEN_NEW_PRODUCT } from '@commons/constants/open-new-products';
import { ModalGenericComponent } from '@commons/components/modal-generic/modal-generic.component';
import {
  IQrInfoState,
  IQrProductsState
} from '@modules/main-container/store/states/main-container.state';

export async function validateQr(
  info: IQrInfoState,
  products: IQrProductsState,
  isAnnulment: boolean,
  metadata: string
): Promise<void> {
  !!this.modalService.modal && this.modalService.close();
  this.saveTemplate.saveDataTemplate({
    ...this.saveTemplate.dataTemplate,
    toWho: {
      metadata
    }
  });
  if (
    !isAnnulment &&
    !!products?.information &&
    info.information?.trxPurpose === '00'
  ) {
    products.information?.length > 0
      ? await this.navCtrl.navigateRoot([QR_PAYMENT])
      : await this.navCtrl.navigateForward([
          OPEN_ACCOUNT_CUSTOM,
          URLS_OPEN_NEW_PRODUCT.QR
        ]);
  } else if (isAnnulment && info.information?.trxPurpose === '02') {
    this.saveTemplate.saveDataTemplate({
      ...this.saveTemplate.dataTemplate,
      toWho: {
        ...this.saveTemplate.dataTemplate.toWho,
        qrInfo: info.information
      }
    });
    await this.navCtrl.navigateRoot([QR_ANNULMENT]);
  } else if (products?.error && info?.completed) {
    await this.navCtrl.navigateForward([
      OPEN_ACCOUNT_CUSTOM,
      URLS_OPEN_NEW_PRODUCT.QR
    ]);
  } else if (isAnnulment && info.information?.trxPurpose === '00') {
    await genericModal.bind(this)(
      'PAYMENT.NOT_REGISTERED.ERROR_BARCODE.TITLE',
      'QR.MODALS.PAYMENT.DESCRIPTION',
      false,
      'icon-vel-face-wrong',
      'error'
    );
  } else if (!isAnnulment && info.information?.trxPurpose === '02') {
    await genericModal.bind(this)(
      'PAYMENT.NOT_REGISTERED.ERROR_BARCODE.TITLE',
      'QR.MODALS.NOT_ANNULMENT.DESCRIPTION',
      false,
      'icon-vel-face-wrong',
      'error'
    );
  } else if (products.completed && info?.error) {
    await genericModal.bind(this)(
      'QR.MODALS.ERROR_QR.TITLE',
      'QR.MODALS.ERROR_QR.DESCRIPTION',
      false,
      'icon-vel-face-wrong',
      'error'
    );
  } else if (info?.error && products?.error) {
    await genericModal.bind(this)();
  }
}

export function genericModal(
  title: string = 'PAYMENT.NOT_REGISTERED.ERROR_BARCODE.TITLE',
  description: string = 'PAYMENT.NOT_REGISTERED.ERROR_BARCODE.DESCRIPTION',
  close: boolean = false,
  icon: string,
  iconType: string,
  type: string
): Promise<void> {
  return this.modalService.openModal(
    ModalGenericComponent,
    {
      icon,
      iconType,
      close,
      type,
      title: this.translateService.instant(title),
      description: this.translateService.instant(description),
      firstBtn: this.translateService.instant('UNDERSTOOD')
    },
    'default-modal'
  );
}
