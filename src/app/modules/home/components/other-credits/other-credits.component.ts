import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { ICard } from '@commons/entities/card.entities';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { IPayrollLoans } from '@commons/entities/pay-rolls-loans.entities';
import { TypeCreditCardPipe } from '@commons/pipes/type-credit-card.pipe';
import { ImageCdnPipe } from '@commons/pipes/image-cdn.pipe';
import { IPayRollLoansState } from '@app/modules/main-container/store/states/products.state';
import { mapperRollLoans } from '../../mappers/pay-roll-loans.mapper';
import { IProductBasic } from '@modules/main-container/entities/main-products.entities';
import { IFreeDestinationDetail } from '@modules/main-container/entities/free-destination.entities';
import { freeDestinationCreditsMapper } from '@modules/home/mappers/free-destination.mapper';

@Component({
  selector: 'app-other-credits',
  templateUrl: './other-credits.component.html',
  styleUrls: ['./other-credits.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OtherCreditsComponent {
  @Input() rollLoansAll: IPayRollLoansState;
  @Input() freeDestination: IFreeDestinationDetail[];

  @Output() goToDetail: EventEmitter<IProductBasic> = new EventEmitter<
    IProductBasic
  >(null);
  @Output() actionCredits: EventEmitter<void> = new EventEmitter();

  constructor(
    private translateService: TranslateService,
    private currencyFormat: CurrencyFormatPipe,
    private typeCreditCard: TypeCreditCardPipe,
    private imageCdnPipe: ImageCdnPipe
  ) {}

  public slideOpts: object = {
    slidesPerView: 'auto',
    centeredSlides: false,
    speed: 400,
    touchReleaseOnEdges: true,
    iOSEdgeSwipeThreshold: 50,
    iOSEdgeSwipeDetection: true
  };

  get dataRollLoans(): IPayrollLoans[] {
    return this.rollLoansAll?.rollLoans;
  }

  get dataFreeDestinationDetails(): IFreeDestinationDetail[] {
    return this.freeDestination;
  }

  get hasRollLoans(): boolean {
    return this.dataRollLoans?.length > 0;
  }

  get hasFreeDestination(): boolean {
    return this.dataFreeDestinationDetails?.length > 0;
  }

  get quantityLoans(): number {
    return !!this.dataRollLoans ? this.dataRollLoans?.length : 0;
  }

  get quantityFreeDestinationCredits(): number {
    return !!this.dataFreeDestinationDetails
      ? this.dataFreeDestinationDetails?.length
      : 0;
  }

  get validateLengthLoan(): boolean {
    return this.quantityLoans > 0;
  }

  public validatePlural(creditType: 'payrollLoan' | 'freeDestination'): string {
    const quantity =
      creditType === 'payrollLoan'
        ? this.quantityLoans
        : this.quantityFreeDestinationCredits;
    return quantity > 1
      ? 'PRODUCT_TYPES.PLURAL_CREDIT'
      : 'PRODUCT_TYPES.CREDIT';
  }

  public sufficientSlides(quantity: number): boolean {
    return quantity > 1;
  }

  public isOnly(rollLoans: IPayrollLoans[]): boolean {
    return rollLoans.length <= 1;
  }

  public neededToPay(rollLoans: IPayrollLoans): boolean {
    return rollLoans.feeAmount > 0;
  }

  public isOverdueCredit(freeDestination: IFreeDestinationDetail): boolean {
    return freeDestination.dueDays > 0;
  }

  public progress(rollLoans: IPayrollLoans): number {
    return (
      100 -
      Math.round((rollLoans.obligationBalance / rollLoans.approvedAmount) * 100)
    );
  }

  public progressFreeDestination(freeDest: IFreeDestinationDetail): number {
    return (
      100 -
      Math.round((freeDest.approvalAmount / freeDest.minimumAmountToPay) * 100)
    );
  }

  public setRollLoans(
    rollLoansState: IPayRollLoansState,
    rollLoans: IPayrollLoans
  ): ICard {
    return mapperRollLoans(
      rollLoansState,
      rollLoans,
      this.translateService,
      this.currencyFormat,
      this.imageCdnPipe
    );
  }

  public setFreeDestinationCredits(
    freeDestination: IFreeDestinationDetail
  ): ICard {
    return freeDestinationCreditsMapper(
      freeDestination,
      this.translateService,
      this.currencyFormat,
      this.imageCdnPipe
    );
  }
}
