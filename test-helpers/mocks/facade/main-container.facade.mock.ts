import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Params } from '@angular/router';

import {
  INicknamesState,
  IPayRollLoansState,
  IPocketsState,
  IProductsState
} from '@modules/main-container/store/states/products.state';
import { Product } from '@commons/models/product.model';
import {
  IQrInfoState,
  IQrProductsState,
  IStocksAllState,
  IStocksPeriodState,
  IStocksTypeState
} from '@modules/main-container/store/states/main-container.state';
import { initStocksAll } from '@modules/main-container/store/reducers/stocks-all.reducer';
import { initStocksPeriod } from '@modules/main-container/store/reducers/stocks-period.reducer';
import { initStocksType } from '@modules/main-container/store/reducers/stocks-type.reducer';
import { IDataUser } from '@modules/main-container/entities/user.entities';
import { initDataUser } from '@modules/main-container/store/reducers/data-user.reducer';
import { IPocket, IPocketsByProduct } from '@commons/entities/pockets.entities';
import { initProductsQr } from '@modules/main-container/store/reducers/qr-products.reducer';
import { initQrInfo } from '@modules/main-container/store/reducers/qr-info.reducer';
import { initRollLoans } from '@modules/main-container/store/reducers/pay-roll-loans.reducer';
import { initPockets } from '@modules/main-container/store/reducers/pockets.reducer';
import { initNicknames } from '@modules/main-container/store/reducers/nicknames.reducer';

export const productsMock = {
  DEPOSIT_ACCOUNT: [
    {
      errorStatusCode: '',
      approvalId: null,
      errorMessage: '',
      specificErrorMessage: '',
      accountInformation: {
        accountIdentifier: '110080000680',
        bank: 'BANCO_POPULAR',
        currencyCode: '',
        productName: 'Cuenta Corriente',
        productType: 'CURRENT_ACCOUNT'
      },
      status: 'ACTIVE',
      openedDate: null,
      closedDate: null,
      dueDate: '2021-02-03T10:42:16.441004',
      lastTransactionDate: '2021-02-03T10:42:15.62',
      overDraftDays: 0,
      term: null,
      periodicityOfPayment: null,
      productAccountBalances: {
        cupos_aprobado_sobregiro: {
          amount: 0,
          currencyCode: '',
          rate: 0
        },
        cupo_disponible_sobregiro: {
          amount: 0,
          currencyCode: '',
          rate: 0
        },
        cupo_aprobado_remesas: {
          amount: 0,
          currencyCode: '',
          rate: 0
        },
        saldo_canje: {
          amount: 0,
          currencyCode: '',
          rate: 0
        },
        saldo_actual: {
          amount: 5499.8,
          currencyCode: '',
          rate: 0
        },
        saldo_ayer: {
          amount: 5499.8,
          currencyCode: '',
          rate: 0
        },
        saldo_disponible: {
          amount: 5499.8,
          currencyCode: '',
          rate: 0
        },
        saldo_canje_24_horas: {
          amount: 0,
          currencyCode: '',
          rate: 0
        },
        saldo_canje_48_horas: {
          amount: 0,
          currencyCode: '',
          rate: 0
        },
        saldo_canje_72_horas: {
          amount: 0,
          currencyCode: '',
          rate: 0
        }
      },
      couldHavePockets: false,
      capacity: null,
      didAthCall: true,
      enabled: true,
      success: true,
      request: {
        accountId: '110080000680',
        accountType: 'CURRENT_ACCOUNT',
        channel: 'MB',
        id: '19198659',
        idType: 'CC',
        customerId: '19198659',
        customerIdType: 'CC',
        deviceId: '1234_mock',
        companyId: 'BANCO_POPULAR',
        ipAddress: '3.13.132.40'
      },
      dateTime: '2021-02-03T10:42:16.446',
      id: '110080000680',
      typeAccount: 'DEPOSIT_ACCOUNT'
    }
  ]
};

@Injectable()
export class MainContainerFacadeMock {
  public products$: Observable<Product[]> = new BehaviorSubject(
    productsMock.DEPOSIT_ACCOUNT as any
  );

  public payRollLoans$: Observable<IPayRollLoansState> = new BehaviorSubject(
    initRollLoans
  );

  public pockets$: Observable<IPocketsState> = new BehaviorSubject({
    ...initPockets,
    data: [
      {
        parent: {
          accountIdentifier: '110080000680',
          productType: 'DEPOSIT_ACCOUNT'
        },
        pockets: [
          {
            pocketId: '178',
            pocketType: 'DEPOSIT_ACCOUNT',
            pocketName: 'Pruebas_4__U',
            savingGoal: 87500.0,
            amountPeriodicSavings: 13200.0,
            amountSaved: 87555.2,
            pendingAmount: 86500.0,
            pocketPeriod: 'WEEKLY',
            pocketPeriodDescription: 'Semanal',
            category: 'Ahorro'
          },
          {
            pocketId: '182',
            pocketType: 'DEPOSIT_ACCOUNT',
            pocketName: 'eeeee',
            amountSaved: 40007.7
          }
        ],
        totalSavedOnPockets: 127562.9,
        success: true
      },
      {
        parent: {
          accountIdentifier: '500800078504',
          productType: 'DEPOSIT_ACCOUNT'
        },
        pockets: [
          {
            pocketId: '23',
            pocketType: 'DEPOSIT_ACCOUNT',
            pocketName: 'segundo',
            amountSaved: 18008.37
          },
          {
            pocketId: '24',
            pocketType: 'DEPOSIT_ACCOUNT',
            pocketName: 'tercero',
            amountSaved: 20007.42
          },
          {
            pocketId: '25',
            pocketType: 'DEPOSIT_ACCOUNT',
            pocketName: 'cuarto',
            amountSaved: 9004.37
          },
          {
            pocketId: '26',
            pocketType: 'DEPOSIT_ACCOUNT',
            pocketName: 'quinto',
            amountSaved: 23011.97
          },
          {
            pocketId: '27',
            pocketType: 'DEPOSIT_ACCOUNT',
            pocketName: 'primero',
            amountSaved: 80055.7
          }
        ],
        totalSavedOnPockets: 150087.83,
        success: true
      },
      {
        parent: {
          accountIdentifier: '280480001221',
          productType: 'DEPOSIT_ACCOUNT'
        },
        pockets: [
          {
            pocketId: '1',
            pocketType: 'SAVING_POCKET',
            pocketName: 'WILLIAM DAVID O',
            savingGoal: 0.0,
            amountPeriodicSavings: 0.0,
            amountSaved: 30000.0,
            pendingAmount: 0.0
          },
          {
            pocketId: '2',
            pocketType: 'SAVING_POCKET',
            pocketName: 'semestre',
            savingGoal: 0.0,
            amountPeriodicSavings: 0.0,
            amountSaved: 40000.0,
            pendingAmount: 0.0
          }
        ],
        totalSavedOnPockets: 70000.0,
        success: true
      },
      {
        parent: {
          accountIdentifier: '280739021962',
          productType: 'DEPOSIT_ACCOUNT'
        },
        pockets: [
          {
            pocketId: '1',
            pocketType: 'SAVING_POCKET',
            pocketName: 'paty',
            savingGoal: 250000.0,
            amountPeriodicSavings: 50000.0,
            amountSaved: 30.0,
            pendingAmount: 249970.0,
            pocketPeriod: 'WEEKLY',
            pocketPeriodDescription: 'Semanal'
          },
          {
            pocketId: '2',
            pocketType: 'SAVING_POCKET',
            pocketName: 'wertyr',
            savingGoal: 250.0,
            amountPeriodicSavings: 50.0,
            amountSaved: 30.0,
            pendingAmount: 220.0,
            pocketPeriod: 'MONTHLY',
            pocketPeriodDescription: 'Mensual'
          },
          {
            pocketId: '3',
            pocketType: 'SAVING_POCKET',
            pocketName: 'hgfhfhgr',
            savingGoal: 250.0,
            amountPeriodicSavings: 50.0,
            amountSaved: 30.0,
            pendingAmount: 220.0,
            pocketPeriod: 'MONTHLY',
            pocketPeriodDescription: 'Mensual'
          },
          {
            pocketId: '4',
            pocketType: 'SAVING_POCKET',
            pocketName: 'POCKET TEST 3',
            savingGoal: 250.0,
            amountPeriodicSavings: 50.0,
            amountSaved: 30.0,
            pendingAmount: 220.0,
            pocketPeriod: 'MONTHLY',
            pocketPeriodDescription: 'Mensual'
          },
          {
            pocketId: '5',
            pocketType: 'SAVING_POCKET',
            pocketName: 'POCKET TEST 4',
            savingGoal: 250.0,
            amountPeriodicSavings: 50.0,
            amountSaved: 30.0,
            pendingAmount: 220.0,
            pocketPeriod: 'MONTHLY',
            pocketPeriodDescription: 'Mensual'
          }
        ],
        totalSavedOnPockets: 150.0,
        success: true
      },
      {
        parent: {
          accountIdentifier: '280739021970',
          productType: 'DEPOSIT_ACCOUNT'
        },
        pockets: [
          {
            pocketId: '1',
            pocketType: 'SAVING_POCKET',
            pocketName: 'POCKETTEST1_U_U',
            savingGoal: 307180.0,
            amountPeriodicSavings: 39280.0,
            amountSaved: 0.0,
            pendingAmount: 307180.0,
            pocketPeriod: 'BIWEEKLY',
            pocketPeriodDescription: 'Quincenal',
            category: 'Ahorro'
          },
          {
            pocketId: '2',
            pocketType: 'SAVING_POCKET',
            pocketName: 'POCKETTEST2_U_U',
            savingGoal: 0.0,
            amountPeriodicSavings: 0.0,
            amountSaved: 0.0,
            pendingAmount: 0.0
          },
          {
            pocketId: '3',
            pocketType: 'SAVING_POCKET',
            pocketName: 'Test_U_U_U_U_U',
            savingGoal: 0.0,
            amountPeriodicSavings: 0.0,
            amountSaved: 15.0,
            pendingAmount: 0.0
          },
          {
            pocketId: '4',
            pocketType: 'SAVING_POCKET',
            pocketName: 'POCKET FREDY 1',
            savingGoal: 0.0,
            amountPeriodicSavings: 0.0,
            amountSaved: 15.0,
            pendingAmount: 0.0
          },
          {
            pocketId: '5',
            pocketType: 'SAVING_POCKET',
            pocketName: 'POCKET FREDY 2',
            savingGoal: 10000.0,
            amountPeriodicSavings: 1000.0,
            amountSaved: 15.0,
            pendingAmount: 9985.0,
            pocketPeriod: 'MONTHLY',
            pocketPeriodDescription: 'Mensual',
            category: 'Gasto'
          }
        ],
        totalSavedOnPockets: 45.0,
        success: true
      }
    ] as IPocketsByProduct[]
  });
  public hasTuplus$: Observable<boolean> = new BehaviorSubject(null);
  public complementary$: Observable<boolean> = new BehaviorSubject(true);

  public combinationProducts$: Observable<Product[]> = new BehaviorSubject(
    productsMock.DEPOSIT_ACCOUNT as any
  );
  public routerParams$: Observable<Params> = new BehaviorSubject(null);
  public productList$: Observable<IProductsState> = new BehaviorSubject({
    products: productsMock as any,
    loading: false,
    completed: false,
    error: false,
    errorMessage: ''
  });
  public stocksAll$: Observable<IStocksAllState> = new BehaviorSubject(
    initStocksAll
  );
  public stocksPeriod$: Observable<IStocksPeriodState> = new BehaviorSubject(
    initStocksPeriod
  );
  public stocksType$: Observable<IStocksTypeState> = new BehaviorSubject(
    initStocksType
  );
  public dataUser$: Observable<IDataUser> = new BehaviorSubject(
    initDataUser.information
  );
  public lastDate$: Observable<string> = new BehaviorSubject('');
  public qrInfo$: Observable<IQrInfoState> = new BehaviorSubject(initQrInfo);

  public nicknames$: Observable<INicknamesState> = new BehaviorSubject(
    initNicknames
  );

  public qrProducts$: Observable<IQrProductsState> = new BehaviorSubject(
    initProductsQr
  );

  public beforeUrl$: Observable<string> = new BehaviorSubject('');
  public routerUrl$: Observable<string> = new BehaviorSubject('');

  public filterProducts$(): any {
    return new BehaviorSubject([]);
  }

  public findPayLoan$(): any {
    return new BehaviorSubject([]);
  }

  public findProduct$(): Observable<Product> {
    return new BehaviorSubject(null);
  }

  public findPocket$(): Observable<IPocketsByProduct> {
    return new BehaviorSubject(null);
  }

  public findPocketsByProduct$(): Observable<IPocket[]> {
    return new BehaviorSubject(null);
  }

  public fetchLoadProducts(): void {}
  public logout(): void {}
  public validatePing(): void {}
  public toogleHiddenId(): void {}
  public validateSession(): void {}
  public fetchLoadProduct(): void {}
  public fetchTuplus(): void {}
  public fetchStocksAll(): void {}
  public fetchStocksType(): void {}
  public fetchNicknames(): void {}
  public fetchRollLoans(): void {}
  public fetchStocksPeriod(): void {}
  public fetchUserData(): void {}
  public fetchPockets(): void {}
  public fetchLoadPocketDetail(): void {}
  public fetchQrInfo(): void {}
  public qrInfoReset(): void {}
  public fetchQrProducts(): void {}
  public qrProductsReset(): void {}
  public fetchProduct(): void {}
  public fetchMovements(): void {}
  public setCreditCard(): void {}
  public resetCreditCard(): void {}
  public resetPocketDetail(): void {}
  public openToast(): void {}
  // tslint:disable-next-line:max-file-line-count
}
