import {
  DOCUMENTS_CERTIFICATES_NEW,
  DOCUMENTS_STATEMENTS_NEW,
  DOCUMENTS_TAX_CERTIFICATES_NEW,
  NEW_PAYMENT_LOANS,
  NEW_PAYMENT_NOT_REGISTERED,
  NEW_PAYMENT_PILA,
  NEW_PAYMENT_PUBLIC,
  NEW_PAYMENT_TAXES,
  NEW_TRANSFER_FAST_TRANSFER,
  NEW_TRANSFER,
  NEW_TRANSFER_NOT_REGISTERED,
  NEW_TRANSFER_PROGRAM_TRANSFERS,
  NEW_TRANSFER_CELL_TO_CELL
} from '@commons/constants/navigatie-global';
import { IGenericHome } from '@commons/entities/generic-home-product-entities';
import { ID_SECTIONS } from '@commons/constants/menu_items';

export const GENERIC_HOME_PAYMENTS: IGenericHome = {
  type: 'list',
  title: 'HOME_PAYMENT.TITLE',
  img: '/payments-doc.png',
  imgTitle: 'HOME_PAYMENT.IMAGE_TITLE',
  items: [
    {
      title: 'HOME_PAYMENT.OBLIGATIONS.TITLE',
      description: 'HOME_PAYMENT.OBLIGATIONS.DESCRIPTION',
      path: NEW_PAYMENT_LOANS,
      enable: true,
      id: ID_SECTIONS.paymentObligations
    },
    {
      title: 'HOME_PAYMENT.REGISTERED.TITLE',
      description: 'HOME_PAYMENT.REGISTERED.DESCRIPTION',
      path: NEW_PAYMENT_PUBLIC,
      enable: true,
      id: ID_SECTIONS.paymentRegistered
    },
    {
      title: 'HOME_PAYMENT.NOT_REGISTERED.TITLE',
      description: 'HOME_PAYMENT.NOT_REGISTERED.DESCRIPTION',
      path: NEW_PAYMENT_NOT_REGISTERED,
      enable: true,
      id: ID_SECTIONS.paymentNotRegistered
    },
    {
      title: 'HOME_PAYMENT.TAXES.TITLE',
      description: 'HOME_PAYMENT.TAXES.DESCRIPTION',
      path: NEW_PAYMENT_TAXES,
      enable: true,
      id: ID_SECTIONS.paymentTaxes
    },
    {
      title: 'HOME_PAYMENT.PILA.TITLE',
      description: 'HOME_PAYMENT.PILA.DESCRIPTION',
      path: NEW_PAYMENT_PILA,
      enable: true,
      id: ID_SECTIONS.paymentPila
    }
  ]
};

export const GENERIC_HOME_TRANSFERS: IGenericHome = {
  type: 'list',
  title: 'HOME_TRANSFER.TITLE',
  img: '/money-hands.png',
  imgTitle: 'HOME_TRANSFER.IMAGE_TITLE',
  items: [
    {
      icon: 'icon-vel-payments-finance-transfer-12',
      img: '',
      title: 'HOME_TRANSFER.FAST_TRANSFER.TITLE',
      description: 'HOME_TRANSFER.FAST_TRANSFER.DESCRIPTION',
      path: NEW_TRANSFER_FAST_TRANSFER,
      enable: false,
      id: ID_SECTIONS.fastTransfer,
      idHTML: 'Transferir_href_transfeRapida'
    },
    {
      icon: 'icon-vel-payments-finance-transfer-12',
      img: '/money-box.png',
      title: 'HOME_TRANSFER.NEW_TRANSFER.TITLE',
      description: 'HOME_TRANSFER.NEW_TRANSFER.DESCRIPTION',
      path: NEW_TRANSFER,
      enable: true,
      id: ID_SECTIONS.transferRegistered,
      idHTML: 'Transferir_href_ctaInscrita'
    },
    {
      icon: 'icon-vel-payments-finance-transfer-15',
      img: '/money-hands.png',
      title: 'HOME_TRANSFER.NOT_REGISTERED.TITLE',
      description: 'HOME_TRANSFER.NOT_REGISTERED.DESCRIPTION',
      path: NEW_TRANSFER_NOT_REGISTERED,
      enable: true,
      id: ID_SECTIONS.transferNotRegistered,
      idHTML: 'Transferir_href_ctaNOInscrita'
    },
    {
      icon: 'icon-vel-essential-clock-28',
      img: '',
      title: 'HOME_TRANSFER.PROGRAM_TRANSFERS.TITLE',
      description: 'HOME_TRANSFER.PROGRAM_TRANSFERS.DESCRIPTION',
      path: NEW_TRANSFER_PROGRAM_TRANSFERS,
      enable: false,
      id: ID_SECTIONS.programTransfers,
      idHTML: 'Transferir_href_programTransfe'
    },
    {
      icon: 'icon-vel-essential-cellphone',
      img: '',
      title: 'HOME_TRANSFER.CELL_TO_CELL.TITLE',
      description: 'HOME_TRANSFER.CELL_TO_CELL.DESCRIPTION',
      path: NEW_TRANSFER_CELL_TO_CELL,
      enable: false,
      id: ID_SECTIONS.cellToCell,
      idHTML: 'Transferir_href_cellToCell'
    }
  ]
};

export const GENERIC_HOME_DOCUMENTS: IGenericHome = {
  type: 'list',
  title: 'DOCUMENTS.HOME_DOCUMENTS.TITLE',
  img: '/80-pay-sheet.png',
  imgTitle: 'DOCUMENTS.HOME_DOCUMENTS.IMAGE_TITLE',
  items: [
    {
      title: 'DOCUMENTS.HOME_DOCUMENTS.STATEMENTS.TITLE',
      description: 'DOCUMENTS.HOME_DOCUMENTS.STATEMENTS.DESCRIPTION',
      path: DOCUMENTS_STATEMENTS_NEW,
      enable: true,
      id: ID_SECTIONS.documents
    },
    {
      title: 'DOCUMENTS.HOME_DOCUMENTS.PRODUCT_CERTIFICATES.TITLE',
      description: 'DOCUMENTS.HOME_DOCUMENTS.PRODUCT_CERTIFICATES.DESCRIPTION',
      path: DOCUMENTS_CERTIFICATES_NEW,
      enable: true,
      id: ID_SECTIONS.documents
    },
    {
      title: 'DOCUMENTS.HOME_DOCUMENTS.TAX_CERTIFICATES.TITLE',
      description: 'DOCUMENTS.HOME_DOCUMENTS.TAX_CERTIFICATES.DESCRIPTION',
      path: DOCUMENTS_TAX_CERTIFICATES_NEW,
      enable: true,
      id: ID_SECTIONS.documents
    }
  ]
};
