import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation
} from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';

import { ICard } from '@commons/entities/card.entities';
import { HomeFacade } from '@modules/home/home.facade';
import {
  IStockPeriod,
  IStocksAllParams,
  IStockType
} from '@modules/main-container/entities/stocks.interface';
import { ITuplusState } from '@modules/main-container/store/states/main-container.state';
import { environment } from '@environment/environment';
import { mapperTuplus } from '@modules/home/mappers/tuplus.mapper';
import { TranslateService } from '@ngx-translate/core';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { ImageCdnPipe } from '@commons/pipes/image-cdn.pipe';
import { ModalService } from '@commons/services/modal.service';
import { ModalGenericComponent } from '@commons/components/modal-generic/modal-generic.component';
import {
  TUPLUS_DETAIL,
  TUPLUS_OPTION_TO_REDEEM
} from '@commons/constants/navigatie-global';

@Component({
  selector: 'app-group-actions',
  templateUrl: './group-actions.component.html',
  styleUrls: ['./group-actions.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupActionsComponent {
  public slideOpts: object = {
    slidesPerView: 'auto',
    centeredSlides: false,
    speed: 400,
    touchReleaseOnEdges: true,
    iOSEdgeSwipeThreshold: 50,
    iOSEdgeSwipeDetection: true
  };

  constructor(
    private facade: HomeFacade,
    private translateService: TranslateService,
    private currencyFormat: CurrencyFormatPipe,
    private imageCdnPipe: ImageCdnPipe,
    private modalService: ModalService,
    private navCtrl: NavController
  ) {}

  get url(): string {
    return environment.external_url.tuplus;
  }

  get tuplus$(): Observable<ITuplusState> {
    return this.facade.tuplusBalance$;
  }

  get hasTuplus$(): Observable<boolean> {
    return this.tuplus$.pipe(map((data) => !!data.information));
  }

  get hasTypeStocks$(): Observable<boolean> {
    return this.facade.stocksType$.pipe(map((data) => !!data?.information));
  }

  get typeStocks$(): Observable<IStockType[]> {
    return this.facade.stocksType$.pipe(map((data) => data?.information));
  }

  get periodStocks$(): Observable<IStockPeriod[]> {
    return this.facade.stocksPeriod$.pipe(map((data) => data?.information));
  }

  get isLoadingStocksAll$(): Observable<boolean> {
    return this.facade.stocksAll$.pipe(map((data) => data.loading));
  }

  public openModal(): void {
    this.modalService.openModal(
      ModalGenericComponent,
      {
        icon: 'icon-vel-warning-hex',
        iconType: 'warning',
        title: this.translateService.instant('REDIRECT'),
        description: this.translateService.instant('TUPLUS.DESCRIPTION_MODAL'),
        hasInLineLink: true,
        firstBtn: this.translateService.instant('CONTINUE'),
        secondBtn: this.translateService.instant('CANCEL'),
        eventFirstBtn: this.openBrowser.bind(this),
        eventSecondBtn: this.closeModal.bind(this)
      },
      'default-modal'
    );
  }

  public openBrowser(): void {
    window.open(environment.external_url.tuplus, '_system', 'location=no');
    this.facade.logout();
  }

  public setTuplus(tuplus: ITuplusState): ICard {
    return mapperTuplus(
      tuplus,
      this.translateService,
      this.currencyFormat,
      this.imageCdnPipe
    );
  }

  public fetchStocks(body: IStocksAllParams): void {
    this.facade.fetchStocksAll(body);
  }

  public redirectTuplusDetail() {
    this.navCtrl.navigateForward([TUPLUS_DETAIL]);
  }

  public redirectTuplusRedeem() {
    this.navCtrl.navigateForward([TUPLUS_OPTION_TO_REDEEM]);
  }

  private closeModal(): void {
    this.modalService.close();
  }
}
