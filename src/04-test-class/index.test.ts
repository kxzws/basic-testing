// Uncomment the code below and write your tests
import lodash from 'lodash';

import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

jest.mock('lodash');

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    // Write your test here
    const account = getBankAccount(120);

    expect(account.getBalance()).toEqual(120);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    // Write your test here
    const account = getBankAccount(120);

    expect(() => account.withdraw(150)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    // Write your test here
    const account1 = getBankAccount(120);
    const account2 = getBankAccount(40);

    expect(() => account1.transfer(150, account2)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    // Write your test here
    const account = getBankAccount(120);

    expect(() => account.transfer(50, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    // Write your test here
    const account = getBankAccount(120);

    account.deposit(30);

    expect(account.getBalance()).toEqual(150);
  });

  test('should withdraw money', () => {
    // Write your test here
    const account = getBankAccount(120);

    account.withdraw(20);

    expect(account.getBalance()).toEqual(100);
  });

  test('should transfer money', () => {
    // Write your test here
    const account1 = getBankAccount(120);
    const account2 = getBankAccount(40);

    account1.transfer(20, account2);

    expect(account2.getBalance()).toEqual(60);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    // Write your tests here
    const spy = jest
      .spyOn(lodash, 'random')
      .mockReturnValueOnce(50)
      .mockReturnValueOnce(1);

    const account = getBankAccount(120);
    const result = await account.fetchBalance();

    expect(typeof result).toBe('number');

    spy.mockRestore();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    // Write your tests here
    const spy = jest
      .spyOn(lodash, 'random')
      .mockReturnValueOnce(50)
      .mockReturnValueOnce(1);

    const account = getBankAccount(120);

    await account.synchronizeBalance();

    expect(account.getBalance()).toEqual(50);

    spy.mockRestore();
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    // Write your tests here
    const spy = jest
      .spyOn(lodash, 'random')
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0);

    const account = getBankAccount(120);

    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );

    spy.mockRestore();
  });
});
