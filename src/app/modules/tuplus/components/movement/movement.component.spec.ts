import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { TestingModule } from '@test-helpers/testing.module';
import { TuplusFacade } from '@modules/tuplus/tuplus.facade';
import { MovementComponent } from '@modules/tuplus/components/movement/movement.component';
import { calculateDate } from '@commons/helpers/global.helper';
import { TuplusFacadeMock } from '@test-helpers/mocks/facade/tuplus.facade.mock';

const movements = {
  TransactionId: '1-CORONA1',
  CancelTrxId: '',
  CardNumber: '',
  AccountPoints: '',
  TotalPoints: '2000',
  BranchName: 'Pago a tarjeta de crédito',
  State: 'Procesado',
  CreatedDt: new Date(calculateDate('getDate', 'setDate', 30)),
  TrnType: 'Canje',
  SubStatus: 'Correcto',
  OverrideReasonCode: '',
  AccumulationItem: [
    {
      IdAccrualed: '124563711798',
      PointName: 'Puntos AVAL',
      AccrualedPoints: '1000',
      PointsRemaining: '0',
      PointsUsedValue: '1000',
      AccumulationPartner: 'POPULAR',
      EstablishmentCalc: '',
      EstablishDt: new Date(),
      ExpDt: new Date(),
      Desc: ''
    }
  ],
  TotalAmount: '4455500',
  RedemptionItem: [
    {
      AccrualItemID: '1-UAZ-2',
      ItemCount: '1-1682893584',
      BalType: 'COP',
      Amt: '6000',
      BalTypeRetencion: 'COP',
      AmtRetencion: '0',
      Desc: 'Redención en la cuenta ****',
      DescRetencion: 'Valor retención en la fuente',
      PartnerName: 'POPULAR',
      Value: '500'
    }
  ]
};

const movements2 = {
  TransactionId: '1-CORONA1',
  CancelTrxId: '',
  CardNumber: '',
  AccountPoints: '',
  TotalPoints: '2000',
  BranchName: 'Pago a tarjeta de crédito',
  State: 'Procesado',
  CreatedDt: new Date(calculateDate('getDate', 'setDate', 30)),
  TrnType: 'Acumulación',
  SubStatus: 'Correcto',
  OverrideReasonCode: '',
  AccumulationItem: [
    {
      IdAccrualed: '124563711798',
      PointName: 'Puntos AVAL',
      AccrualedPoints: '1000',
      PointsRemaining: '0',
      PointsUsedValue: '1000',
      AccumulationPartner: 'POPULAR',
      EstablishmentCalc: '',
      EstablishDt: new Date(),
      ExpDt: new Date(),
      Desc: ''
    }
  ],
  TotalAmount: '4455500',
  RedemptionItem: [
    {
      AccrualItemID: '1-UAZ-2',
      ItemCount: '1-1682893584',
      BalType: 'COP',
      Amt: '6000',
      BalTypeRetencion: 'COP',
      AmtRetencion: '0',
      Desc: 'Redención en la cuenta ****',
      DescRetencion: 'Valor retención en la fuente',
      PartnerName: 'POPULAR',
      Value: '500'
    }
  ]
};

describe('MovementComponent', () => {
  let component: MovementComponent;
  let fixture: ComponentFixture<MovementComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MovementComponent],
        imports: [IonicModule, TestingModule],
        providers: [
          {
            provide: TuplusFacade,
            useClass: TuplusFacadeMock
          }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(MovementComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
