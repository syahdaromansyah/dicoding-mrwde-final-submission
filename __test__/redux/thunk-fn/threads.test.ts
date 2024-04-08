import { configureStore } from '@reduxjs/toolkit';
import { fetchThreads } from '../../../src/rtk/slices/threadsSlice';
// eslint-disable-next-line import/no-extraneous-dependencies
import { afterAll, describe, expect, test, vi } from 'vitest';

const threadsResponseData = {
  data: {
    status: 'success',
    message: 'threads retrieved',
    data: {
      threads: [
        {
          id: 'thread-1',
          title: 'Thread Pertama',
          body: 'Ini adalah thread pertama',
          category: 'General',
          createdAt: '2021-06-21T07:00:00.000Z',
          ownerId: 'users-1',
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
        },
        {
          id: 'thread-2',
          title: 'Thread Kedua',
          body: 'Ini adalah thread kedua',
          category: 'General',
          createdAt: '2021-06-21T07:00:00.000Z',
          ownerId: 'users-2',
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
        },
      ],
    },
  },
};

vi.mock('../../../src/network-data/network-data.ts', async (importOriginal) => {
  const originalModules =
    await importOriginal<
      typeof import('../../../src/network-data/network-data.ts')
    >();

  return {
    ...originalModules,
    getThreads: () => Promise.resolve(threadsResponseData),
  };
});

describe('The Threads Thunk Function', () => {
  afterAll(() => {
    vi.doUnmock('../../../src/network-data/network-data.ts');
  });

  test('should return the threads response to store when fetching is fulfilled', async () => {
    const threadsStore = configureStore({
      reducer(state, action) {
        if (action.type === 'threads/fetchThreads/fulfilled') {
          return action.payload;
        }

        return {
          data: {
            threads: [],
          },
          message: '',
          status: '',
        };
      },
    });

    const dispatchResult = await threadsStore.dispatch(fetchThreads());

    expect(dispatchResult.type).toBe('threads/fetchThreads/fulfilled');

    const state = threadsStore.getState();

    expect(state).toEqual(threadsResponseData.data);
  });
});
