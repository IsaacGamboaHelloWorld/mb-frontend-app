import { IRequestMovements } from '@modules/tuplus/entities/movement-tuplus.entities';
import { BANKS } from '@commons/constants/banks';
import { calculateDate, dateFormat } from '@commons/helpers/global.helper';
import {
  ACUMULACION,
  CANJE,
  URLIMAGE
} from '@modules/tuplus/constants/banks-information';
import { ImageCdnPipe } from '@commons/pipes/image-cdn.pipe';
import { DecimalPipe } from '@angular/common';

const imageCdnPipe = new ImageCdnPipe();
const decimalPipe = new DecimalPipe('en-US');
export const movementsTuplusMapper = (): IRequestMovements => ({
  companyId: BANKS.BANCO_POPULAR,
  transactionsRequest: {
    startDt: new Date(calculateDate('getDate', 'setDate', 30)),
    endDt: new Date(),
    isPagination: false,
    numPage: 0
  }
});

export const detailMovementTuplusMapper = (
  movement,
  translateService
): IDetailMovement => ({
  bank:
    movement?.TrnType === CANJE
      ? movement?.RedemptionItem[0]?.PartnerName
      : movement?.TrnType === ACUMULACION
      ? movement?.AccumulationItem[0]?.AccumulationPartner
      : '',
  img:
    movement?.TrnType === CANJE
      ? imageCdnPipe.transform(
          imageBank(movement?.RedemptionItem[0]?.PartnerName)
        )
      : movement?.TrnType === ACUMULACION
      ? imageCdnPipe.transform(
          imageBank(movement?.AccumulationItem[0]?.AccumulationPartner)
        )
      : '',
  date: dateFormat(movement?.CreatedDt, 'dd/MMM/yyyy', true, false),
  description: movement?.BranchName,
  equivalent: decimalPipe.transform(movement?.TotalAmount)?.replace(/,/g, '.'),
  textValue: translateService.instant('TUPLUS.VALOR'),
  points:
    movement?.TrnType === CANJE
      ? decimalPipe.transform(-movement?.TotalPoints)?.replace(/,/g, '.')
      : decimalPipe.transform(movement?.TotalPoints)?.replace(/,/g, '.'),
  textPoints: translateService.instant('TUPLUS.POINTS'),
  type: movement?.TrnType === CANJE ? 'canje' : 'acumulacion'
});

export interface IDetailMovement {
  bank: string;
  img: string;
  date: string;
  description: string;
  equivalent: string;
  textValue: string;
  points: string;
  textPoints: string;
  type: string;
}

export function imageBank(bankName): string {
  switch (bankName) {
    case 'POPULAR':
      return URLIMAGE.BANCO_POPULAR;
    case 'AVVILLAS':
      return URLIMAGE.BANCO_AV_VILLAS;
    case 'BOGOTA':
      return URLIMAGE.BANCO_DE_BOGOTA;
    case 'OCCIDENTE':
      return URLIMAGE.BANCO_OCCIDENTE;
    case '':
      return '';
  }
}
