import {
  joinProducts,
  joinOtherProducts
} from '@commons/helpers/joinProducts.helper';

describe('joinProducts', () => {
  const mockData = {
    CURRENT_ACCOUNT: [
      {
        errorStatusCode: null,
        approvalId: null,
        errorMessage: '',
        specificErrorMessage: null,
        accountInformation: {
          accountIdentifier: '550801079234',
          bank: 'BANCO_POPULAR',
          currencyCode: null,
          productName: 'Cuenta Corriente',
          productType: 'CURRENT_ACCOUNT'
        },
        status: null,
        openedDate: null,
        closedDate: null,
        dueDate: '2022-06-03T12:10:00.911478',
        lastTransactionDate: null,
        overDraftDays: null,
        term: null,
        periodicityOfPayment: null,
        productAccountBalances: null,
        couldHavePockets: false,
        capacity: null,
        didAthCall: false,
        enabled: true,
        success: true,
        id: '550801079234',
        nameAccount: 'Cuenta Corriente',
        typeAccount: 'CURRENT_ACCOUNT',
        nameSmall: 'Cta. Corriente',
        loading: true,
        completed: false,
        error: false,
        showHiddenId: true,
        hiddenIdStatus: false
      }
    ],
    DEPOSIT_ACCOUNT: [
      {
        errorStatusCode: null,
        approvalId: null,
        errorMessage: '',
        specificErrorMessage: null,
        accountInformation: {
          accountIdentifier: '500800958439',
          bank: 'BANCO_POPULAR',
          currencyCode: null,
          productName: 'Cuenta de Ahorros',
          productType: 'DEPOSIT_ACCOUNT'
        },
        status: null,
        openedDate: null,
        closedDate: null,
        dueDate: '2022-06-03T12:10:00.911424',
        lastTransactionDate: null,
        overDraftDays: null,
        term: null,
        periodicityOfPayment: null,
        productAccountBalances: null,
        couldHavePockets: true,
        capacity: null,
        didAthCall: false,
        enabled: true,
        success: true,
        id: '500800958439',
        nameAccount: 'Cuenta de Ahorros',
        typeAccount: 'DEPOSIT_ACCOUNT',
        nameSmall: 'Cta. Ahorros',
        loading: true,
        completed: false,
        error: false,
        showHiddenId: true,
        hiddenIdStatus: false
      }
    ]
  };

  it('should be return length 0', () => {
    expect(joinProducts(null).length).toBe(0);
  });

  it('should not be length = 0 joinProducts()', () => {
    expect(joinProducts(mockData).length).not.toBe(0);
  });

  it('should not be length = 0 joinOtherProducts()', () => {
    expect(joinOtherProducts(mockData).length).not.toBe(0);
  });

  it('should be length = 0 joinOtherProducts()', () => {
    expect(joinOtherProducts({}).length).toBe(0);
  });
});
