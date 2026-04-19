// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  // { a: 1, b: 2, action: Action.Add, expected: 3 },
  // { a: 2, b: 2, action: Action.Add, expected: 4 },
  // { a: 3, b: 2, action: Action.Add, expected: 5 },
  // continue cases for other actions
  { a: 2, b: 4, action: Action.Add, expected: 6 },
  { a: 2, b: 4, action: Action.Subtract, expected: -2 },
  { a: 2, b: 4, action: Action.Multiply, expected: 8 },
  { a: 2, b: 4, action: Action.Divide, expected: 1 / 2 },
  { a: 2, b: 4, action: Action.Exponentiate, expected: 16 },
  { a: 2, b: 4, action: 'Invalid', expected: null },
  { a: 'c', b: new Date(), action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  // This test case is just to run this test suite, remove it when you write your own tests
  // test('should blah-blah', () => {
  //   expect(true).toBe(true);
  // });
  // Consider to use Jest table tests API to test all cases above
  test.each(testCases)(
    'simpleCalculator($a, $b, $action) should be $expected',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
