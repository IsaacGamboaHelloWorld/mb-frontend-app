import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  ViewEncapsulation
} from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ITuplusState } from '@modules/main-container/store/states/main-container.state';
import { IConfigurationFactorState } from '@modules/tuplus/store/states/configuration-factor.state';
import { ICard } from '@commons/entities/card.entities';
import { mapperTuplus } from '@modules/home/mappers/tuplus.mapper';
import {
  HOME,
  TUPLUS_DETAIL,
  TUPLUS_OPTION_TO_REDEEM
} from '@commons/constants/navigatie-global';
import { movementsTuplusMapper } from '@modules/tuplus/mappers/movements-tuplus.mapper';
import { IMovementsTuplusState } from '@modules/tuplus/store/states/movements-tuplus.state';
import { TuplusAbstract } from '@modules/tuplus/utils/tuplus.abstract';
import {
  converToDecimal,
  ItuplusBankPoints,
  tuplusBanksPointsMapper
} from '@modules/tuplus/mappers/tuplus-banks-points.mapper';

@Component({
  selector: 'app-container-detail-tuplus',
  templateUrl: './container-tuplus-detail.component.html',
  styleUrls: ['./container-tuplus-detail.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ContainerDetailComponentTuplus extends TuplusAbstract {
  private _showFilter: boolean = false;
  private _zeroPoints: number = 0;

  constructor(protected injector: Injector) {
    super(injector);
  }

  get tuplus$(): Observable<ITuplusState> {
    return this.facade.tuplusBalance$;
  }

  get movements$(): Observable<IMovementsTuplusState> {
    return this.facade.movements$;
  }

  get conversionFactor$(): Observable<IConfigurationFactorState> {
    return this.facade.conversionFactor$;
  }

  get pointsTuplus$(): Observable<string> {
    return this.facade.tuplusBalance$.pipe(
      map((data) =>
        data?.information?.totalPoints
          ? converToDecimal(data?.information?.totalPoints)
          : '0'
      )
    );
  }

  get showFilter(): boolean {
    return this._showFilter;
  }

  public equivalentPoints(tuplus, conversionFactor): number {
    if (!!conversionFactor?.information?.ConversionFactor) {
      return (
        tuplus?.information?.totalPoints *
        conversionFactor?.information?.ConversionFactor
      );
    } else {
      return this._zeroPoints;
    }
  }

  public fetchMovements(): void {
    return this.facade.fetchMovements(movementsTuplusMapper());
  }

  public setBankPoints(bank: string, points: number): ItuplusBankPoints {
    return tuplusBanksPointsMapper(
      bank,
      points,
      this.translateService,
      this.imageCdn
    );
  }

  public setTuplus(tuplus: ITuplusState): ICard {
    return mapperTuplus(
      tuplus,
      this.translateService,
      this.currencyFormat,
      this.imageCdn
    );
  }

  public back(): void {
    this.logoutTuplus();
    this.navCtrl.navigateBack(HOME);
  }

  public toggleFilters(): void {
    this._showFilter = !this._showFilter;
  }

  public redirectToRedemption() {
    this.facade.fetchSourcePath(TUPLUS_DETAIL);
    this.navCtrl.navigateForward([TUPLUS_OPTION_TO_REDEEM]);
  }
}
