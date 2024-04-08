import { configureStore } from '@reduxjs/toolkit';
import { fetchLeaderBoards } from '../../../src/rtk/slices/leaderBoardsSlice';
// eslint-disable-next-line import/no-extraneous-dependencies
import { afterAll, describe, expect, test, vi } from 'vitest';

const leaderBoardsResponseData = {
  data: {
    status: 'success',
    message: 'leaderboards retrieved successfully',
    data: {
      leaderboards: [
        {
          user: {
            id: 'users-1',
            name: 'John Doe',
            email: 'john@example.com',
            avatar: 'https://generated-image-url.jpg',
          },
          score: 10,
        },
        {
          user: {
            id: 'users-2',
            name: 'Jane Doe',
            email: 'jane@example.com',
            avatar: 'https://generated-image-url.jpg',
          },
          score: 5,
        },
      ],
    },
  },
};

vi.mock('@/network-data/network-data.ts', async (importOriginal) => {
  const originalModules =
    await importOriginal<
      typeof import('../../../src/network-data/network-data.ts')
    >();

  return {
    ...originalModules,
    getLeaderboards: () => Promise.resolve(leaderBoardsResponseData),
  };
});

describe('The Leaderboards Thunk Function', () => {
  afterAll(() => {
    vi.doUnmock('../../../src/network-data/network-data.ts');
  });

  test('should return the leaderboards response to store when fetching is fulfilled', async () => {
    const leaderBoardsStore = configureStore({
      reducer(_, action) {
        if (action.type === 'leaderBoards/fetchLeaderBoards/fulfilled') {
          return action.payload;
        }

        return {
          data: {
            leaderBoards: [],
          },
          message: '',
          status: '',
        };
      },
    });

    const dispatchResult =
      await leaderBoardsStore.dispatch(fetchLeaderBoards());

    expect(dispatchResult.type).toBe(
      'leaderBoards/fetchLeaderBoards/fulfilled',
    );

    const state = leaderBoardsStore.getState();

    expect(state).toEqual(leaderBoardsResponseData.data);
  });
});
