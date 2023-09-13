import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { GestureController } from '@ionic/angular';
import { first, map, takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

import { ConfigTemplateService } from '@commons/velocity/templates/utils/services/config-template.service';
import { QrFacade } from '@modules/qr/new-payment/qr.facade';
import {
  IQrInfoState,
  IQrProductsState
} from '@modules/main-container/store/states/main-container.state';
import { SaveDataTemplateService } from '@commons/velocity/templates/utils/services/save-data-template.service';
import { PropertyTemplate } from '@commons/velocity/templates/utils/constants/urls-template.constant';
import { qrPaymentConfirmationMapper } from '@modules/qr/new-payment/mappers/confirmation-qr.mapper';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { VALIDATOR_MESSAGES } from '@modules/forms/constants/validator.constant';
import { AnimationService } from '@modules/qr/new-payment/services/animation.service';
import { NumberOfInstalmentsConstant } from '@modules/qr/new-payment/constants/number-of-instalments.constant';

const heightHeader =
  (document.querySelector('ion-header') as HTMLElement)?.offsetHeight || 62;
const heightBox = window.innerHeight - heightHeader;

@Component({
  selector: 'app-to-who-qr',
  templateUrl: './to-who-qr.component.html',
  styleUrls: ['./to-who-qr.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToWhoQrComponent implements OnInit, OnDestroy {
  @ViewChild('swipe', { static: true })
  swipe: ElementRef;
  @ViewChild('dynamic', { static: true })
  dynamic: ElementRef;
  public today: Date = new Date();
  public formQr: FormGroup;
  public isSmall: boolean = window.innerHeight <= 640;
  public showShadow: boolean = false;
  public elementAnimation: any;
  public beforeHeight: number;
  private _destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private animation: AnimationService,
    private configTemplate: ConfigTemplateService,
    private fb: FormBuilder,
    private facade: QrFacade,
    private gestureCtrl: GestureController,
    private saveDataTemplateService: SaveDataTemplateService,
    private currencyFormat: CurrencyFormatPipe,
    private translateService: TranslateService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // @ts-ignore
    this.configTemplate.config.ionContent?.el?.classList.add('not-scroll');
    if (!!this.dynamic) {
      this._initForm();
      this._animation();
    }
  }

  ngOnDestroy(): void {
    // @ts-ignore
    this.configTemplate.config.ionContent?.el?.classList.remove('not-scroll');
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  get cards$(): Observable<IQrProductsState> {
    return this.facade.qrProducts$;
  }

  get from(): AbstractControl {
    return this.formQr.get('from');
  }

  get numberOfInstalments(): AbstractControl {
    return this.formQr.get('numberOfInstalments');
  }

  get disabledSum(): boolean {
    return this.numberOfInstalments.value >= NumberOfInstalmentsConstant.MAX;
  }

  get disabledSubtract(): boolean {
    return this.numberOfInstalments.value <= NumberOfInstalmentsConstant.MIN;
  }

  get qrInfo$(): Observable<IQrInfoState> {
    return this.facade.qrInfo$;
  }

  public sum(): void {
    this.numberOfInstalments.setValue(
      this.numberOfInstalments.value >= NumberOfInstalmentsConstant.MAX
        ? NumberOfInstalmentsConstant.MAX
        : this.numberOfInstalments.value + NumberOfInstalmentsConstant.MIN
    );
  }

  public subtract(): void {
    this.numberOfInstalments.setValue(
      this.numberOfInstalments.value <= NumberOfInstalmentsConstant.MIN
        ? NumberOfInstalmentsConstant.MIN
        : this.numberOfInstalments.value - NumberOfInstalmentsConstant.MIN
    );
  }

  get hasInfoQr(): Observable<boolean> {
    return this.qrInfo$.pipe(map((data) => !!data.information));
  }

  public submitForm(): void {
    if (this.formQr.valid) {
      this.qrInfo$.pipe(first()).subscribe((data) => {
        if (
          +this.from.value?.accountBalance >=
          +data?.information?.transactionAmount
        ) {
          this.animation.setShowShadow(false);
          this.saveDataTemplateService.saveDataTemplate({
            ...this.saveDataTemplateService.dataTemplate,
            toWho: {
              ...this.saveDataTemplateService.dataTemplate.toWho,
              ...this.formQr.value,
              qrInfo: data?.information
            },
            confirmation: qrPaymentConfirmationMapper.bind(this)({
              toWho: {
                ...this.formQr.value,
                qrInfo: data?.information
              }
            }),
            stepActive: PropertyTemplate.confirmation
          });
          this.configTemplate.changeStep(this.configTemplate.config.router[1]);
        } else {
          this.facade.openToast(VALIDATOR_MESSAGES.insufficientFunds);
        }
      });
    }
  }

  private _initForm(): void {
    this.formQr = this.fb.group({
      from: [
        this.saveDataTemplateService.dataTemplate?.toWho?.from || null,
        Validators.required
      ],
      numberOfInstalments: [
        this.saveDataTemplateService.dataTemplate?.toWho?.numberOfInstalments ||
          1,
        Validators.required
      ]
    });
  }

  private _animation(): void {
    this._setHeight();
    this.animation.actionClick
      .pipe(takeUntil(this._destroy$))
      .subscribe((_) => {
        this.dynamic.nativeElement.style.transition = '100ms ease-in-out';
        this.showShadow = false;
        this.animation.setShowShadow(this.showShadow);
        this.dynamic.nativeElement.style.transform = `translate3d(0, -${
          this.isSmall ? 196 : 290
        }px, 0)`;
        this._time();
      });

    const gesture: any = this.gestureCtrl.create({
      el: this.swipe.nativeElement,
      gestureName: 'swipe',
      direction: 'y',
      disableScroll: true,
      onMove: (detail) => {
        this._onMove(detail);
      },
      onEnd: (data) => {
        this.dynamic.nativeElement.style.transition = '100ms ease-in-out';
        if (data.currentY > this.beforeHeight) {
          this.showShadow = false;
          this.dynamic.nativeElement.style.transform = `translate3d(0, -${
            this.isSmall ? 196 : 290
          }px, 0)`;
        } else {
          this.showShadow = true;
          this.dynamic.nativeElement.style.transform = `translate3d(0, -${heightBox}px, 0)`;
        }
        this.animation.setShowShadow(this.showShadow);
        this._time();
      },
      onStart: (data) => {
        this.beforeHeight = Math.floor(data.currentY);
      }
    });
    gesture.enable();
  }

  private _onMove(detail: any): void {
    const wh = window.innerHeight;
    const height =
      detail.currentY < wh - heightBox ? -heightBox : detail.currentY - wh;
    this.dynamic.nativeElement.style.transform = `translate3d(0,${height}px, 0)`;
  }

  private _time(): void {
    this.cd.detectChanges();
    setTimeout(() => {
      this.dynamic.nativeElement.style.transition = '';
    }, 200);
  }

  private _setHeight(): void {
    this.dynamic.nativeElement.style.bottom = `${heightHeader -
      window.innerHeight}px`;
    (document.querySelector(
      '.scroll-content-qr'
    ) as HTMLElement).style.maxHeight = this.dynamic.nativeElement.style.height = `${heightBox}px`;
  }
}
