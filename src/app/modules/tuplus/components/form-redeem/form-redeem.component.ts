import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { filter, first, map, take } from 'rxjs/operators';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';

import {
  CREDIT_ACCOUNT,
  DEPOSIT_ACCOUNT,
  EXCLUDED_BINES,
  IWithdrawalPlace,
  WITHDRAWAL_PLACES
} from '@modules/tuplus/constants/fixed-amount.constant';
import { ICardSmallEntities } from '@commons/entities/card-small.entities';
import { Product } from '@commons/models/product.model';
import { GROUP_ONE } from '@commons/constants/group-products';
import { trackBy } from '@app/commons/helpers/trackBy.helper';
import { cardSmallMapper } from '@commons/mappers/card-small.mapper';
import {
  typeAccountTuplusValidator,
  ValidatePointsLimits
} from '@modules/tuplus/helpers/redeem-points.validators';
import { TYPE_ACCOUNTS } from '@commons/constants/types_account';
import { IRedeemPointsState } from '@modules/tuplus/store/states/redeem-tuplus.state';
import { ModalGenericComponent } from '@commons/components/modal-generic/modal-generic.component';
import { TYPE_MODAL_PUSH } from '@modules/push-notification/constants/type-modal.constant';
import { TUPLUS_DETAIL } from '@commons/constants/navigatie-global';
import {
  limitPointsMessageMapper,
  redeemPointsServiceMapper,
  successModalMapper
} from '../../mappers/redeem-points.mapper';
import { TuplusAbstract } from '@modules/tuplus/utils/tuplus.abstract';

@Component({
  selector: 'app-form-redeem',
  templateUrl: './form-redeem.component.html',
  styleUrls: ['./form-redeem.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class FormRedeemComponent extends TuplusAbstract
  implements OnInit, OnDestroy {
  @ViewChild('hiddenElement', { static: true })
  public formWhereToRedeem: FormGroup;
  private _approvalIdOtp: string = '';
  private _otpRequired: boolean;
  private _showCards: boolean = false;
  private _depositAccounts: boolean = true;
  private _openOtp: boolean = false;
  private _retryLimit: boolean;
  private _creditCardAccounts: boolean;
  private _amtEquivalent: number;
  private _equivalent: number;
  private _factor: number = 0;
  private _minPoints: number;
  private _maxPoints: number;
  private _equivalentAmt: Subscription;
  private _generationOtp: Subscription;
  private _redeemTuplus: Subscription;
  private _responseCreditCards: Subscription;
  private _creditCards: Product[] = [];

  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.amountEquivalent();
    this.otpRequeridedTuplus();
    this.factorConversionTuplus();
    this.pointLimits();
    this._initForm();
    this.equivalentPoints();
    this._responseCreditCards = this.creditCard$.subscribe((data) => {
      this._creditCards = data;
    });
  }

  ngOnDestroy() {
    this._equivalentAmt?.unsubscribe();
    this._generationOtp?.unsubscribe();
    this._redeemTuplus?.unsubscribe();
    this._responseCreditCards!.unsubscribe();
  }

  get isLoadingGenerateOtp$(): Observable<boolean> {
    return this.facade.generateOtp$?.pipe(map((data) => data?.loading));
  }

  get isLoadingRedeemService$(): Observable<boolean> {
    return this.facade.redeemPoints$?.pipe(map((data) => data?.loading));
  }

  get tuplusTotalPoints$(): Observable<number> {
    return this.facade.tuplusBalance$?.pipe(
      map((data) => data?.information?.totalPoints)
    );
  }

  get enableCreditCards(): Product[] {
    return this._creditCards.filter(
      (item) => !EXCLUDED_BINES.includes(item.id.substring(0, 6))
    );
  }

  get creditCard$(): Observable<Product[]> {
    return this.facade.filterProducts$([TYPE_ACCOUNTS.CREDIT_CARD]);
  }

  get redeemPointsResult$(): Observable<IRedeemPointsState> {
    return this.facade.redeemPoints$;
  }

  get products$(): Observable<Product[]> {
    return this.facade.filterProducts$(GROUP_ONE);
  }

  get where(): AbstractControl {
    return this.formWhereToRedeem?.get('where');
  }

  get deposit(): AbstractControl {
    return this.formWhereToRedeem?.get('deposit');
  }

  get points(): AbstractControl {
    return this.formWhereToRedeem?.get('points');
  }

  get credit(): AbstractControl {
    return this.formWhereToRedeem?.get('credit');
  }

  get creditControl(): AbstractControl {
    return this.formWhereToRedeem?.controls?.['credit'];
  }

  get retryRedeem(): boolean {
    return this._retryLimit;
  }

  get equivalentAmount(): number {
    return this._equivalent;
  }

  get hasCreditCard(): boolean {
    this._creditCardAccounts = this.enableCreditCards.length > 0;
    return this._creditCardAccounts;
  }

  get showCardsAccounts(): boolean {
    return this._showCards;
  }

  get openOtpTuplus(): boolean {
    return this._openOtp;
  }

  get optionCardsValue(): string {
    return this.formWhereToRedeem.controls?.['where']?.value?.value;
  }

  get depositAccountSelected(): boolean {
    if (this.optionCardsValue == DEPOSIT_ACCOUNT) {
      this._depositAccounts = true;
      this._showCards = true;
    } else if (this.optionCardsValue == CREDIT_ACCOUNT) {
      this._showCards = true;
      this._depositAccounts = false;
    }
    return this._depositAccounts;
  }

  get productActive(): ICardSmallEntities {
    return cardSmallMapper(
      this.formWhereToRedeem?.value?.deposit,
      this.translateService,
      this.currencyFormat
    );
  }

  get withdrawalPlaces(): IWithdrawalPlace[] {
    return WITHDRAWAL_PLACES;
  }

  public amountEquivalent(): Subscription {
    return this.facade.conversionFactor$.pipe(take(1)).subscribe((value) => {
      this._amtEquivalent = value?.information?.OtpInfo?.MinCurAmt?.Amt;
    });
  }

  public otpRequeridedTuplus(): Subscription {
    return this.facade.conversionFactor$.pipe(take(1)).subscribe((value) => {
      this._otpRequired = value?.information?.OtpInfo?.OtpRequired;
    });
  }

  public factorConversionTuplus(): Subscription {
    return this.facade.conversionFactor$.pipe(take(1)).subscribe((value) => {
      this._factor = value?.information?.ConversionFactor;
    });
  }

  public pointLimits(): Subscription {
    return this.facade.conversionFactor$.pipe(take(1)).subscribe((value) => {
      this._minPoints = value?.information?.MinCurAmt?.Amt;
      this._maxPoints = value?.information?.MaxCurAmt?.Amt;
    });
  }

  public limitPointsMessage(): void {
    return limitPointsMessageMapper(
      this.translateService,
      this._minPoints,
      this._maxPoints
    );
  }

  public equivalentPoints(): void {
    this._equivalentAmt = this.formWhereToRedeem.valueChanges.subscribe(() => {
      this._equivalent =
        this.formWhereToRedeem.controls?.['points'].value * this._factor;
    });
  }

  public changeAccount(hiddenElement): void {
    return hiddenElement?.el?.click();
  }

  public trackBy(index: number, product: Product): string {
    return trackBy(product, product.id);
  }

  public openOtpScreen(): void {
    this._generationOtp = this.facade.generateOtp$.subscribe((value) => {
      value?.completed ? (this._openOtp = true) : null;
      value?.error ? (this._retryLimit = true) : null;
    });
  }

  public closeOtpScreen(): void {
    this._openOtp ? (this._openOtp = false) : null;
  }

  public submitGenerated(): void {
    if (this._equivalent >= this._amtEquivalent && this._otpRequired) {
      this.facade.fetchGenerateOtp();
      this.openOtpScreen();
    } else {
      this.dispatchRedeem();
    }
  }

  public dispatchRedeem(): void {
    if (this._openOtp) {
      this.facade.generateOtp$
        .pipe(
          take(1),
          filter((data) => data.information?.Transaction?.ApprovalId != '')
        )
        .subscribe((value) => {
          this._approvalIdOtp = value?.information?.Transaction?.ApprovalId;
          if (this._approvalIdOtp != '') {
            this.facade.fetchRedeem(
              redeemPointsServiceMapper(
                this.formWhereToRedeem,
                this._equivalent,
                this._approvalIdOtp
              )
            );
          }
        });
    } else {
      this.facade.fetchRedeem(
        redeemPointsServiceMapper(
          this.formWhereToRedeem,
          this._equivalent,
          this._approvalIdOtp
        )
      );
    }
    this.validateOpenModal();
  }

  public validateOpenModal(): void {
    this._redeemTuplus = this.facade.redeemPoints$.subscribe((value) => {
      if (value?.completed) {
        this.closeOtpScreen();
        this.openDepositSuccessModal();
      } else if (value?.error) {
        this._retryLimit = true;
      } else if (value?.errorRetry) {
        this.closeOtpScreen();
        this.openErrorModal();
      }
    });
  }

  public openErrorModal(): void {
    this.modalService.openModal(
      ModalGenericComponent,
      {
        icon: 'icon-vel-face-wrong',
        iconType: 'error',
        type: TYPE_MODAL_PUSH.enabled,
        title: this.translateService.instant(
          'TUPLUS.WHERE_TO_REDEEM.ERROR_TITLE'
        ),
        hasInLineLink: true,
        description: this.translateService.instant(
          'TUPLUS.WHERE_TO_REDEEM.ERROR_DESCRIPTION'
        ),
        firstBtn: this.translateService.instant('TRY_AGAIN_LATER'),
        eventFirstBtn: this.overflowModalButton.bind(this)
      },
      'default-modal',
      false,
      true
    );
  }

  public openDepositSuccessModal(): void {
    this.modalService.openModal(
      ModalGenericComponent,
      successModalMapper.bind(this)(),
      'default-modal',
      false,
      true
    );
  }

  public overflowModalButton = () => {
    this.modalService.close();
    this.navCtrl.navigateBack([TUPLUS_DETAIL]);
  };

  private _initForm(): void {
    this.formWhereToRedeem = this.fb.group({
      where: [
        null,
        [Validators.required, typeAccountTuplusValidator.bind(this)]
      ],
      deposit: [null],
      credit: [null],
      points: [
        null,
        [
          Validators.required,
          ValidatePointsLimits(this._minPoints, this._maxPoints)
        ]
      ],
      otp: ['']
    });
    this.products$
      .pipe(
        filter((products) => products.length > 0),
        first()
      )
      .subscribe((products) => {
        this.formWhereToRedeem.controls['deposit'].setValue(products[0]);
        this.formWhereToRedeem.controls['deposit'].markAsTouched();
      });
  }
}
