// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    // Write your test here
    const result = simpleCalculator({ a: 2, b: 4, action: Action.Add });

    expect(result).toEqual(6);
  });

  test('should subtract two numbers', () => {
    // Write your test here
    const result = simpleCalculator({ a: 2, b: 4, action: Action.Subtract });

    expect(result).toEqual(-2);
  });

  test('should multiply two numbers', () => {
    // Write your test here
    const result = simpleCalculator({ a: 2, b: 4, action: Action.Multiply });

    expect(result).toEqual(8);
  });

  test('should divide two numbers', () => {
    // Write your test here
    const result = simpleCalculator({ a: 2, b: 4, action: Action.Divide });

    expect(result).toEqual(1 / 2);
  });

  test('should exponentiate two numbers', () => {
    // Write your test here
    const result = simpleCalculator({
      a: 2,
      b: 4,
      action: Action.Exponentiate,
    });

    expect(result).toEqual(16);
  });

  test('should return null for invalid action', () => {
    // Write your test here
    const result = simpleCalculator({ a: 2, b: 4, action: 'Invalid' });

    expect(result).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    // Write your test here
    const result = simpleCalculator({
      a: 'c',
      b: new Date(),
      action: Action.Add,
    });

    expect(result).toBe(null);
  });
});
