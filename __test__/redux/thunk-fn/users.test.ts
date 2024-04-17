import { configureStore } from '@reduxjs/toolkit';
import { fetchUsers } from '../../../src/rtk/slices/usersSlice';
// eslint-disable-next-line import/no-extraneous-dependencies
import { afterAll, describe, expect, test, vi } from 'vitest';

/**
 * Unit Test Scenarios
 * ~ The Users Thunk Function Test
 *    - should return the users response to
 *      store when fetching is fulfilled
 */

const usersResponseData = {
  data: {
    status: 'success',
    message: 'ok',
    data: {
      users: [
        {
          id: 'john_doe',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
        {
          id: 'jane_doe',
          name: 'Jane Doe',
          email: 'jane@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
        {
          id: 'uchiha_saskeh',
          name: 'Uchiha Saskeh',
          email: 'saskeh@example.com',
          avatar: 'https://generated-image-url.jpg',
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
    getUsers: () => Promise.resolve(usersResponseData),
  };
});

describe('The Users Thunk Function Test', () => {
  afterAll(() => {
    vi.doUnmock('../../../src/network-data/network-data.ts');
  });

  test('should return the users response to store when fetching is fulfilled', async () => {
    const usersStore = configureStore({
      reducer(_, action) {
        if (action.type === 'users/fetchUsers/fulfilled') {
          return action.payload;
        }

        return {
          data: {
            users: [],
          },
          message: '',
          status: '',
        };
      },
    });

    const dispatchResult = await usersStore.dispatch(fetchUsers());

    expect(dispatchResult.type).toBe('users/fetchUsers/fulfilled');

    const state = usersStore.getState();

    expect(state).toEqual(usersResponseData.data);
  });
});
