// Uncomment the code below and write your tests
import fs from 'fs';
import * as fsPromises from 'fs/promises';
import path from 'path';

import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

jest.mock('fs', () => ({
  existsSync: jest.fn(),
}));

jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
}));

jest.mock('path', () => ({
  join: jest.fn((...args) => args.join('/')),
}));

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    // Write your test here
    const spy = jest.spyOn(global, 'setTimeout');
    const timeout = 3000;
    const callback = () => {};

    doStuffByTimeout(callback, timeout);

    expect(spy).toHaveBeenCalledWith(callback, timeout);

    spy.mockRestore();
  });

  test('should call callback only after timeout', () => {
    // Write your test here
    const callback = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(callback, timeout);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(timeout);

    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    // Write your test here
    const spy = jest.spyOn(global, 'setInterval');
    const interval = 500;
    const callback = () => {};

    doStuffByInterval(callback, interval);

    expect(spy).toHaveBeenCalledWith(callback, interval);

    spy.mockRestore();
  });

  test('should call callback multiple times after multiple intervals', () => {
    // Write your test here
    const callback = jest.fn();
    const interval = 500;

    doStuffByInterval(callback, interval);

    jest.advanceTimersByTime(interval);
    jest.advanceTimersByTime(interval);

    expect(callback).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    // Write your test here
    const fileName = 'test.txt';

    await readFileAsynchronously(fileName);

    expect(path.join).toHaveBeenCalledWith(expect.any(String), fileName);
  });

  test('should return null if file does not exist', async () => {
    // Write your test here
    (fs.existsSync as jest.Mock).mockReturnValue(false);

    const result = await readFileAsynchronously('fake.txt');

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    // Write your test here
    const mockContent = 'hello world';

    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fsPromises.readFile as jest.Mock).mockResolvedValue(
      Buffer.from(mockContent),
    );

    const result = await readFileAsynchronously('real.txt');

    expect(result).toBe(mockContent);
    expect(fsPromises.readFile).toHaveBeenCalled();
  });
});
