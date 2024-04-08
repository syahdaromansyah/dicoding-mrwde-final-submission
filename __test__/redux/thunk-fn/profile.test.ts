import { configureStore } from '@reduxjs/toolkit';
import { fetchProfile } from '../../../src/rtk/slices/profileSlice';
// eslint-disable-next-line import/no-extraneous-dependencies
import { afterEach, describe, expect, test, vi } from 'vitest';

const profileResponseData = {
  data: {
    status: 'success',
    message: 'ok',
    data: {
      user: {
        id: 'john_doe',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://generated-image-url.jpg',
      },
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
    getProfile: () => Promise.resolve(profileResponseData),
  };
});

describe('The Profile Thunk Function', () => {
  afterEach(() => {
    vi.doUnmock('../../../src/network-data/network-data.ts');
  });

  test('should return the profile response to store when fetching is fulfilled', async () => {
    const profileStore = configureStore({
      reducer(_, action) {
        if (action.type === 'profile/fetchProfile/fulfilled') {
          return action.payload;
        }

        return {
          data: {
            user: {},
          },
          message: '',
          status: '',
        };
      },
    });

    const dispatchResult = await profileStore.dispatch(fetchProfile());

    expect(dispatchResult.type).toBe('profile/fetchProfile/fulfilled');

    expect(dispatchResult.payload).toEqual(profileResponseData.data);

    const state = profileStore.getState();

    expect(state).toEqual(profileResponseData.data);
  });
});
