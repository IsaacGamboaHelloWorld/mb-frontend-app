import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, first, map, switchMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { DecimalPipe } from '@angular/common';

import { StocksService } from '@modules/main-container/services/stocks.service';
import {
  IStocks,
  IStocksAvalAll,
  IStocksPeriod,
  IStocksType
} from '@modules/main-container/entities/stocks.interface';
import * as stocks from '@modules/main-container/store/actions/stocks.action';
import { ModalService } from '@commons/services/modal.service';
import { ContModalActionComponent } from '@modules/home/components/cont-modal-action/cont-modal-action.component';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { ImageCdnPipe } from '@commons/pipes/image-cdn.pipe';
import { dateFormat } from '@commons/helpers/global.helper';

const decimalPipe = new DecimalPipe('en-US');

@Injectable()
export class StocksEffects {
  constructor(
    private actions$: Actions,
    private stocksService: StocksService,
    private modalService: ModalService,
    private currencyFormatPipe: CurrencyFormatPipe,
    private translateService: TranslateService,
    private imageCdnPipe: ImageCdnPipe
  ) {}

  LoadStocksType: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(stocks.stocksTypeLoad),
      switchMap((action) => {
        return this.stocksService.typeStocks().pipe(
          first(),
          map((resp: IStocksType) =>
            resp?.success
              ? stocks.stocksTypeSuccess(resp?.stockTypes)
              : stocks.stocksTypeFail(resp?.errorMessage)
          ),
          catchError(() => of(stocks.stocksTypeFail('')))
        );
      })
    )
  );

  LoadStocksPeriod: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(stocks.stocksTypeLoad),
      switchMap((action) => {
        return this.stocksService.periodStocks().pipe(
          first(),
          map((resp: IStocksPeriod) =>
            resp?.success
              ? stocks.stocksPeriodSuccess(resp?.periods)
              : stocks.stocksPeriodFail(resp.errorMessage)
          ),
          catchError(() => of(stocks.stocksPeriodFail('')))
        );
      })
    )
  );

  LoadStocksAll: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(stocks.stocksAllLoad),
      switchMap((action) => {
        return this.stocksService.allStocks(action.params).pipe(
          first(),
          map((resp: IStocksAvalAll) => {
            this.modalStocks(resp.stocksAval, resp.success);
            return resp?.success
              ? stocks.stocksAllSuccess()
              : stocks.stocksAllFail();
          }),
          catchError(() => {
            this.modalStocks([]);
            return of(stocks.stocksAllFail());
          })
        );
      })
    )
  );

  private modalStocks(
    stocksAll: IStocks[] = [],
    success: boolean = false
  ): void {
    this.modalService.openModal(ContModalActionComponent, {
      information: {
        title: this.translateService.instant('STOCKS.INFORMATION.TITLE'),
        img: this.imageCdnPipe.transform('/grupo-aval-white.png'),
        amount: {
          name: this.translateService.instant('STOCKS.INFORMATION.AMOUNT'),
          value: decimalPipe
            .transform(stocksAll[stocksAll.length - 1]?.numberBaseStocks)
            ?.replace(',', '.')
        },
        stocksAll: stocksAll.map((stock) => ({
          name: `${stock?.balanceDescription} ${dateFormat(stock?.date)}`,
          value: this.currencyFormatPipe.transform(stock?.amount)
        })),
        description: this.translateService.instant(
          'STOCKS.INFORMATION.DESCRIPTION'
        )
      },
      success,
      infoError: {
        title: `¡${this.translateService.instant('STATEMENTS.ERROR')}!`,
        description: this.translateService.instant('STOCKS.ERROR'),
        firstBtn: this.translateService.instant('AUTH.ERROR.BTN')
      }
    });
  }
}
