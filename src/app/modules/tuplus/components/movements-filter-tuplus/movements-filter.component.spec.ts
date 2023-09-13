import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { MovementsFilterComponentTuplus } from './movements-filter.component';
import { TestingModule } from '@test-helpers/testing.module';
import { SaveDataTemplateService } from '@commons/velocity/templates/utils/services/save-data-template.service';
import { TuplusFacade } from '@modules/tuplus/tuplus.facade';
import { FilterMovementsTuplusPipe } from '@modules/tuplus/pipes/filter-movements-tuplus.pipe';
import { calculateDate } from '@commons/helpers/global.helper';

const movements1 = {
  ListTransactions: [
    {
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
    }
  ],
  CurrentPage: 0,
  NextPage: false,
  errorMessage: '',
  specificErrorMessage: '',
  success: true
};

describe('MovementsFilterComponent', () => {
  let component: MovementsFilterComponentTuplus;
  let fixture: ComponentFixture<MovementsFilterComponentTuplus>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          MovementsFilterComponentTuplus,
          FilterMovementsTuplusPipe
        ],
        imports: [IonicModule, TestingModule],
        providers: [
          SaveDataTemplateService,
          {
            provide: TuplusFacade
          }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(MovementsFilterComponentTuplus);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('validate hasMovement lenght', () => {
    component.movements = movements1;
    component.hasMovements;
    expect(component.movements.ListTransactions.length).toBeGreaterThan(0);
  });

  it('validate reset date ', () => {
    component.resetDate();
    expect(component.searchDate).toBe('');
  });
  it('validate trackByMovements', () => {
    component.trackByMovements(0, {
      title: '',
      value: '',
      list: [
        {
          title: '',
          value: ''
        }
      ]
    });
  });
});
