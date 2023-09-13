import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import localeEs from '@angular/common/locales/es-US';
import { registerLocaleData } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { first } from 'rxjs/operators';
import { IonicModule } from '@ionic/angular';

import { SecurityService } from '@commons/security/services/security.service';
import { Security } from '@commons/security/utils/security';
import { TestingModule } from '@test-helpers/testing.module';
import { ProductDetailFacade } from './product-detail.facade';
import { ProductDetailPage } from './product-detail.page';
import { ProductDetailFacadeMock } from '@test-helpers/mocks/facade/product-detail.facade.mock';
import { PageOpenAccountService } from '@commons/velocity/pages/utils/page-open-account.service';
import { AdlSecureStorageService } from '@commons/services/adl-security-storage.service';
import { KEYS } from '@commons/constants/global';
import { IPayrollLoans } from '@commons/entities/pay-rolls-loans.entities';

const PAYROLL_LOAN: IPayrollLoans = {
  approvalId: null,
  errorMessage: null,
  specificErrorMessage: null,
  accountId: '55003010110613',
  accountType: 'PAYDAY_LOAN',
  status: '99 - CANCELADO',
  sector: '2 - PENSIONADOS',
  subSector: '',
  company: {
    id: '8001136727',
    name: 'GOBIERNO DEPARTAMENTAL DEL TOLIMA PENSIONADOS - IBAGUE - 550 -',
    invoiceId: '44',
    sliceName: ''
  },
  openingDate: '1976-02-01T07:00:00.000-05:00',
  closingDate: '',
  saleDate: '1900-01-01T07:03:44.000-04:56',
  purchaseDate: '1900-01-01T07:03:44.000-04:56',
  initialAmount: '',
  balanceAmount: '',
  fees: 60.0,
  payedFees: 54.0,
  chargedFees: 54.0,
  approvedAmount: 5000000.0,
  approvalRate: '25',
  feeAmount: 146757.0,
  disbursementAmount: 3951724.0,
  disbursementDate: '2005-05-19T07:00:00.000-05:00',
  initialPaymentDate: '2005-07-05T07:00:00.000-05:00',
  finalPaymentDate: '2010-01-13T07:00:00.000-05:00',
  nextPaymentDate: '2010-02-05T07:00:00.000-05:00',
  initDateArrears: '2010-01-13T07:00:00.000-05:00',
  daysArrears: null,
  lastPaymentDate: '2010-01-13T07:00:00.000-05:00',
  obligationBalance: 0.0,
  modality: '1 - 1-ORD HST 50 AÑO 364 DIA - 1 - PENSIONADO - 3 - PENSIONADOS',
  economicStatus: '1',
  success: true
};

registerLocaleData(localeEs, 'es-US');

describe('ProductDetailPage', () => {
  let component: ProductDetailPage;
  let fixture: ComponentFixture<ProductDetailPage>;
  let route: ActivatedRoute;
  let injectedStorage: AdlSecureStorageService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ProductDetailPage],
        imports: [IonicModule, TestingModule, RouterTestingModule],
        providers: [
          {
            provide: ProductDetailFacade,
            useClass: ProductDetailFacadeMock
          },
          {
            provide: ActivatedRoute,
            useValue: jasmine.createSpyObj('ActivatedRoute', [''])
          },
          SecurityService,
          Security,
          PageOpenAccountService
        ],
        schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
      }).compileComponents();

      route = TestBed.inject(ActivatedRoute);
      fixture = TestBed.createComponent(ProductDetailPage);
      injectedStorage = TestBed.inject(AdlSecureStorageService);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate init component', () => {
    injectedStorage.put(
      KEYS.DETAIL_PRODUCT,
      JSON.stringify({ id: '110080000680', type: 'DEPOSIT_ACCOUNT' })
    );
    component.ionViewWillEnter();
  });

  it('should validate gets', (done: DoneFn) => {
    jasmine.clock().install();
    component.productBasic = { id: '110080000680', type: 'DEPOSIT_ACCOUNT' };
    component.complementary$.pipe(first()).subscribe((data) => {
      expect(data).toBeDefined();
      done();
    });

    component.pocket$.pipe(first()).subscribe((data) => {
      expect(data).toBeDefined();
      done();
    });

    component.pockets$.pipe(first()).subscribe((data) => {
      expect(data).toBeDefined();
      done();
    });
    component.doRefresh({
      target: {
        complete: () => {}
      }
    });
    component.fetchMovements();
    component.trackByServices(0, {
      type: '',
      id: '',
      disabled: false,
      img: '',
      name: ''
    });
    jasmine.clock().tick(2001);
    jasmine.clock().uninstall();
    expect(component.productBasic).toBeDefined();
  });

  it('should validate methods', () => {
    component.productBasic = { id: '110080000680', type: 'DEPOSIT_ACCOUNT' };
    component.toggleFilters();
    component.actionService(null, null);
    component.showPockets();
    component.openDetailModal(null);
    expect(component.productBasic).toBeDefined();
  });

  it('should validate isFinance', (done: DoneFn) => {
    component.productBasic = { id: '55003010110613', type: 'PAYDAY_LOAN' };
    component.product$.pipe(first()).subscribe((data) => {
      expect(data).toBeDefined();
      done();
    });
    expect(component.setMovements(null, PAYROLL_LOAN)).toBeDefined();
    expect(
      component.setMovements(
        {
          information: null,
          loading: false,
          completed: false,
          error: false,
          errorMessage: ''
        },
        PAYROLL_LOAN
      )
    ).toBeDefined();
    expect(component.productDetail(PAYROLL_LOAN)).toBeDefined();
    component.ionViewWillLeave();
  });
});
