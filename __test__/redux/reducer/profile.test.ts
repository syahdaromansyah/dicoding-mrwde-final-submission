/* eslint-disable import/no-extraneous-dependencies */
import { describe, expect, test } from 'vitest';
import profileReducer, {
  initialState,
  resetProfile,
} from '../../../src/rtk/slices/profileSlice.ts';
import type { TProfileResponse } from '../../../src/types/types.ts';

/**
 * Unit Test Scenarios
 * ~ The Profile Reducer Test
 *    - should return the initial state
 *    - should reset the profile state
 */

describe('The Profile Reducer Test', () => {
  test('should return the initial state', () => {
    expect(profileReducer(undefined, { type: 'unknown' })).toEqual(
      initialState,
    );
  });

  test('should reset the profile state', () => {
    const mockedInitState: {
      profile: TProfileResponse;
      status: 'idle' | 'loading' | 'succeeded' | 'failed';
      error: string | null | undefined;
    } = {
      profile: {
        data: {
          user: {
            id: 'user-1',
            name: 'Foo Doe',
            email: 'foodoe@email.com',
            avatar: new URL(
              'https://ui-avatars.com/api/?name=Foo Doe&background=random',
            ).href,
          },
        },
        message: 'User retrieved',
        status: 'success',
      },
      status: 'succeeded',
      error: null,
    };

    expect(profileReducer(mockedInitState, resetProfile())).toEqual(
      initialState,
    );
  });
});
