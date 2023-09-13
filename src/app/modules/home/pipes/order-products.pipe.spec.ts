import { OrderProductsPipe } from './order-products.pipe';
import { TYPE_ACCOUNTS } from '@commons/constants/types_account';

describe('OrderProductsPipe', () => {
  let pipe: OrderProductsPipe;

  beforeEach(() => {
    pipe = new OrderProductsPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should be returned order products', () => {
    expect(pipe.transform(null)).toEqual([]);
  });

  it('should be returned value default', () => {
    expect(
      pipe.transform([
        { key: TYPE_ACCOUNTS.DEPOSIT_ACCOUNT },
        { key: TYPE_ACCOUNTS.CREDIT_CARD },
        { key: TYPE_ACCOUNTS.CURRENT_ACCOUNT },
        { key: TYPE_ACCOUNTS.FREE_DESTINATION },
        { key: 'hola' },
        { key: TYPE_ACCOUNTS.CERTIFIED_DEPOSIT_TERM }
      ])
    ).toEqual([
      { key: TYPE_ACCOUNTS.CURRENT_ACCOUNT },
      { key: TYPE_ACCOUNTS.DEPOSIT_ACCOUNT },
      { key: TYPE_ACCOUNTS.CERTIFIED_DEPOSIT_TERM },
      { key: TYPE_ACCOUNTS.CREDIT_CARD },
      { key: TYPE_ACCOUNTS.FREE_DESTINATION },
      { key: 'hola' }
    ]);
  });
});
