// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('throttledGetDataFromApi', () => {
  const mockGet = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();

    (mockedAxios.create as jest.Mock).mockReturnValue({
      get: mockGet,
    });
  });

  afterEach(() => {
    throttledGetDataFromApi.cancel();
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    // Write your test here
    mockGet.mockResolvedValue({ data: {} });

    const resultPromise = throttledGetDataFromApi('/test');

    jest.runAllTimers();

    await resultPromise;

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    // Write your test here
    const path = '/posts/1';

    mockGet.mockResolvedValue({ data: {} });

    const resultPromise = throttledGetDataFromApi(path);

    jest.runAllTimers();

    await resultPromise;

    expect(mockGet).toHaveBeenCalledWith(path);
  });

  test('should return response data', async () => {
    // Write your test here
    const mockData = { id: 1, title: 'Hello' };

    mockGet.mockResolvedValue({ data: mockData });

    const resultPromise = throttledGetDataFromApi('/posts/1');

    jest.runAllTimers();

    const result = await resultPromise;

    expect(result).toEqual(mockData);
  });
});
