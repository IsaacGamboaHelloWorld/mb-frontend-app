import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { combineLatest, interval, Observable, of, Subject } from 'rxjs';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { TranslateService } from '@ngx-translate/core';
import {
  distinctUntilChanged,
  filter,
  first,
  map,
  takeUntil
} from 'rxjs/operators';
import { NavController } from '@ionic/angular';

import {
  ID_SECTIONS,
  IMenuItem,
  NOT_COMPLEMENTARY_ITEMS
} from '@commons/constants/menu_items';
import { GROUP_ONE } from '@commons/constants/group-products';
import { NAV_BAR_ITEMS } from '@commons/constants/navigation_items_list';
import { ConfigService } from '@commons/services/config.service';
import { MainContainerFacade } from '@modules/main-container/main-container.facade';
import { environment } from '@environment/environment';
import { ModalService } from '@commons/services/modal.service';
import { STATUS_BUTTONS } from '@commons/velocity/templates/utils/entities/config.entities';
import { SaveDataTemplateService } from '@commons/velocity/templates/utils/services/save-data-template.service';
import { VelocityLoaderComponent } from '@commons/velocity/molecules/velocity-loader/velocity-loader.component';
import { TYPE_ACCOUNTS } from '@commons/constants/types_account';
import {
  genericModal,
  validateQr
} from '@modules/main-container/helpers/validate-qr.helper';
import {
  EXPERIENCE,
  OPEN_ACCOUNT_CUSTOM
} from '@commons/constants/navigatie-global';
import { URLS_OPEN_NEW_PRODUCT } from '@commons/constants/open-new-products';
import { ItemNavBar } from '@modules/main-container/entities/user.entities';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavBarComponent implements OnInit, OnDestroy {
  @Input() _openQr: boolean = false;
  private _destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private facade: MainContainerFacade,
    private configService: ConfigService,
    private barcodeScanner: BarcodeScanner,
    private modalService: ModalService,
    private translateService: TranslateService,
    private saveTemplate: SaveDataTemplateService,
    private navCtrl: NavController
  ) {}

  ngOnInit(): void {
    this._watchEvents();
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  get isOpenQr(): boolean {
    return this._openQr;
  }

  get iconQr(): string {
    return this._openQr ? 'icon-vel-close' : 'icon-vel-qr-aval';
  }

  get navBarItems$(): Observable<IMenuItem[]> {
    return this.facade.complementary$.pipe(
      map((isComplementary) => {
        return NAV_BAR_ITEMS.map((item) => {
          item.hasPermissions =
            isComplementary || !environment.validateComplementary
              ? true
              : !NOT_COMPLEMENTARY_ITEMS.includes(item.id);
          this.configService.config.forEach((itemConfig) => {
            if (item.id === itemConfig?.id) {
              item.enable = itemConfig?.enabled;
              item.state = itemConfig.new;
            }
          });
          return item;
        });
      })
    );
  }

  get disabledQR(): Observable<{ disabled: boolean; hasPermissions: boolean }> {
    return this.facade.complementary$.pipe(
      map((isComplementary) => {
        let disabled;
        disabled = this.configService.config.some((itemConfig) => {
          if (ID_SECTIONS.qr === itemConfig?.id) {
            return !itemConfig?.enabled;
          }
        });
        return {
          disabled,
          hasPermissions:
            isComplementary || !environment.validateComplementary
              ? true
              : !NOT_COMPLEMENTARY_ITEMS.includes(ID_SECTIONS.qr)
        };
      })
    );
  }

  get hasProducts(): Observable<boolean> {
    return this.facade
      .filterProducts$(GROUP_ONE)
      .pipe(map((products) => products.length > 0));
  }

  public async actionQr(openQr: boolean): Promise<void> {
    this.toggleQr();
    if (openQr) {
      try {
        const barcodeData = await this.barcodeScanner.scan({
          formats: 'QR_CODE',
          prompt: this.translateService.instant('QR.QR_CODE')
        });
        this.facade.fetchQrProducts('CCA');
        this.facade.fetchQrInfo(btoa(barcodeData.text));
        await this.openLoading();
        this._validateStep(
          combineLatest([
            this.facade.qrInfo$,
            this.facade.qrProducts$,
            interval(2000)
          ]).pipe(
            filter(
              ([info, products, _]) =>
                (info.completed || info.error) &&
                (products.completed || products.error)
            ),
            first()
          ),
          false,
          btoa(barcodeData.text)
        );
      } catch {
        await genericModal.bind(this)(
          'PAYMENT.NOT_REGISTERED.ERROR_BARCODE.TITLE',
          'PAYMENT.NOT_REGISTERED.ERROR_BARCODE.DESCRIPTION',
          false,
          'icon-vel-face-wrong',
          'error'
        );
      }
    } else {
      await genericModal.bind(this)(
        'QR.MODALS.ANNULMENT.TITLE',
        'QR.MODALS.ANNULMENT.DESCRIPTION',
        true,
        null,
        null,
        'annulment'
      );
    }
  }

  public openQR(hasPermissions: boolean): void {
    if (hasPermissions) {
      this.facade
        .filterProducts$([TYPE_ACCOUNTS.CREDIT_CARD])
        .pipe(first())
        .subscribe((data) => {
          data.length > 0
            ? this.toggleQr()
            : this.navCtrl.navigateForward([
                OPEN_ACCOUNT_CUSTOM,
                URLS_OPEN_NEW_PRODUCT.QR
              ]);
        });
    } else {
      this.navCtrl.navigateRoot([EXPERIENCE]);
    }
  }

  public toggleQr(): void {
    this._openQr = !this._openQr;
  }

  public clickItem(event: ItemNavBar): void {
    const url = event.hasProducts
      ? event.hasAmount && event.navigateTo[0]
      : event.navigateTo[1];
    if (event.enable && event?.hasPermissions) {
      if (event.hasProducts) {
        event.hasAmount
          ? this.navCtrl.navigateRoot([url])
          : genericModal.bind(this)(
              'MODALS.MIN_AMOUNT.TITLE',
              'MODALS.MIN_AMOUNT.DESCRIPTION',
              false,
              'icon-vel-face-wrong',
              'error'
            );
      } else {
        this.navCtrl.navigateRoot([url]);
      }
    } else if (!event.hasPermissions) {
      !!event.navigateTo[2] && this.navCtrl.navigateRoot([event.navigateTo[2]]);
    }
  }

  public enableItem$(amount: number): Observable<boolean> {
    return this.facade
      .filterProducts$(GROUP_ONE)
      .pipe(
        map((products) =>
          products.some(
            (product) =>
              product?.productAccountBalances?.saldo_disponible?.amount ||
              0 >= amount
          )
        )
      );
  }

  private async openLoading(): Promise<void> {
    await this.modalService.openModal(
      VelocityLoaderComponent,
      {},
      'default-modal',
      false
    );
  }

  private _validateStep(
    el: Observable<any[]>,
    isAnnulment: boolean = false,
    metadata: string
  ): void {
    el.subscribe(async ([info, products]) =>
      validateQr.bind(this)(info, products, isAnnulment, metadata)
    );
  }

  private _watchEvents(): void {
    this.modalService.actionButtonModal$
      .pipe(
        takeUntil(this._destroy$),
        filter((data) => data === STATUS_BUTTONS.primary)
      )
      .subscribe(
        (_) => !!this.modalService.modal && this.modalService.close(true)
      );

    this.modalService.actionCloseModal$
      .pipe(takeUntil(this._destroy$), distinctUntilChanged())
      .subscribe(async (data) => {
        if (data?.props?.type === 'annulment' && data?.value) {
          try {
            const barcodeData = await this.barcodeScanner.scan({
              formats: 'QR_CODE',
              prompt: this.translateService.instant('QR.QR_CODE')
            });
            this.facade.fetchQrInfo(btoa(barcodeData?.text));
            await this.openLoading();
            this._validateStep(
              combineLatest([
                this.facade.qrInfo$,
                of({
                  information: [],
                  completed: true,
                  error: false
                }),
                interval(2000)
              ]).pipe(
                first(),
                filter(([info, _]) => info.completed || info.error)
              ),
              true,
              btoa(barcodeData?.text)
            );
          } catch {
            await genericModal.bind(this)(
              'PAYMENT.NOT_REGISTERED.ERROR_BARCODE.TITLE',
              'PAYMENT.NOT_REGISTERED.ERROR_BARCODE.DESCRIPTION',
              false,
              'icon-vel-face-wrong',
              'error'
            );
          }
        }
      });
  }
}
