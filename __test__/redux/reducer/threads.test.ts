import type { TThreadsResponse } from '@/types/types.ts';
// eslint-disable-next-line import/no-extraneous-dependencies
import { afterEach, describe, expect, test } from 'vitest';
import threadsReducer, {
  initialState,
  setDownVoteThread,
  setNeutralVoteThread,
  setStatusFetch,
  setUpVoteThread,
} from '../../../src/rtk/slices/threadsSlice.ts';

describe('The Threads Reducer', () => {
  let initialStateTest: {
    threads: TThreadsResponse;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null | undefined;
  };

  afterEach(() => {
    initialStateTest = {
      threads: {
        data: {
          threads: [
            {
              id: 'thread-1',
              title: 'A First Thread',
              body: 'This is a first thread',
              category: 'General',
              createdAt: '2021-06-21T07:00:00.000Z',
              ownerId: 'users-1',
              upVotesBy: [],
              downVotesBy: [],
              totalComments: 0,
            },
          ],
        },
        message: 'success',
        status: 'ok',
      },
      status: 'succeeded',
      error: null,
    };
  });

  test('should return the initial state', () => {
    expect(threadsReducer(undefined, { type: 'unknown' })).toEqual(
      initialState,
    );
  });

  test('should add an user id into an up vote list on a thread', () => {
    expect(
      threadsReducer(
        initialStateTest,
        setUpVoteThread({
          threadId: 'thread-1',
          profileId: 'users-10',
        }),
      ),
    ).toEqual({
      threads: {
        ...initialStateTest.threads,
        data: {
          threads: [
            {
              ...initialStateTest.threads.data.threads[0],
              upVotesBy: ['users-10'],
            },
          ],
        },
      },
      status: 'succeeded',
      error: null,
    });
  });

  test('should add an user id into an down vote list list on a thread', () => {
    expect(
      threadsReducer(
        initialStateTest,
        setDownVoteThread({
          threadId: 'thread-1',
          profileId: 'users-10',
        }),
      ),
    ).toEqual({
      threads: {
        ...initialStateTest.threads,
        data: {
          threads: [
            {
              ...initialStateTest.threads.data.threads[0],
              downVotesBy: ['users-10'],
            },
          ],
        },
      },
      status: 'succeeded',
      error: null,
    });
  });

  test('should remove an user id in upVotesBy list when down voting a thread', () => {
    initialStateTest.threads.data.threads[0].upVotesBy = ['users-10'];

    expect(
      threadsReducer(
        initialStateTest,
        setDownVoteThread({
          threadId: 'thread-1',
          profileId: 'users-10',
        }),
      ),
    ).toEqual({
      threads: {
        ...initialStateTest.threads,
        data: {
          threads: [
            {
              ...initialStateTest.threads.data.threads[0],
              upVotesBy: [],
              downVotesBy: ['users-10'],
            },
          ],
        },
      },
      status: 'succeeded',
      error: null,
    });
  });

  test('should remove an user id in downVotesBy list when up voting a thread', () => {
    initialStateTest.threads.data.threads[0].downVotesBy = ['users-10'];

    expect(
      threadsReducer(
        initialStateTest,
        setUpVoteThread({
          threadId: 'thread-1',
          profileId: 'users-10',
        }),
      ),
    ).toEqual({
      threads: {
        ...initialStateTest.threads,
        data: {
          threads: [
            {
              ...initialStateTest.threads.data.threads[0],
              upVotesBy: ['users-10'],
              downVotesBy: [],
            },
          ],
        },
      },
      status: 'succeeded',
      error: null,
    });
  });

  test('should remove an user id in upVotesBy and downVotesBy list when neutral voting a thread', () => {
    const expectedResult = {
      threads: {
        ...initialStateTest.threads,
        data: {
          threads: [
            {
              ...initialStateTest.threads.data.threads[0],
              upVotesBy: [],
              downVotesBy: [],
            },
          ],
        },
      },
      status: 'succeeded',
      error: null,
    };

    initialStateTest.threads.data.threads[0].upVotesBy = ['users-10'];
    initialStateTest.threads.data.threads[0].downVotesBy = [];

    expect(
      threadsReducer(
        initialStateTest,
        setNeutralVoteThread({
          threadId: 'thread-1',
          profileId: 'users-10',
        }),
      ),
    ).toEqual(expectedResult);

    initialStateTest.threads.data.threads[0].upVotesBy = [];
    initialStateTest.threads.data.threads[0].downVotesBy = ['users-10'];

    expect(
      threadsReducer(
        initialStateTest,
        setNeutralVoteThread({
          threadId: 'thread-1',
          profileId: 'users-10',
        }),
      ),
    ).toEqual(expectedResult);
  });

  test('should change the status fetch state', () => {
    expect(
      threadsReducer(
        initialStateTest,
        setStatusFetch({
          status: 'idle',
        }),
      ),
    ).toEqual({
      ...initialStateTest,
      status: 'idle',
    });
  });
});
