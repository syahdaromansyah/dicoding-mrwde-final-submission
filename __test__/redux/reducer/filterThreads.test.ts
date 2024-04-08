// eslint-disable-next-line import/no-extraneous-dependencies
import { afterEach, describe, expect, test } from 'vitest';
import filterThreadsReducer, {
  initialState,
  setFilterThreads,
} from '../../../src/rtk/slices/filterThreadsSlice.ts';

describe('The Thread Reducer', () => {
  let initialStateTest: {
    filterThreads: string;
  };

  afterEach(() => {
    initialStateTest = {
      filterThreads: '',
    };
  });

  test('should return the initial state', () => {
    expect(filterThreadsReducer(undefined, { type: 'unknown' })).toEqual(
      initialState,
    );
  });

  test('should update the filter threads state', () => {
    expect(
      filterThreadsReducer(
        initialStateTest,
        setFilterThreads({
          filterThreads: 'This is my thread',
        }),
      ),
    ).toEqual({
      filterThreads: 'This is my thread',
    });
  });
});
