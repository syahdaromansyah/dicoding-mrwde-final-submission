import type { TThreadResponse } from '@/types/types.ts';
// eslint-disable-next-line import/no-extraneous-dependencies
import { afterEach, describe, expect, test } from 'vitest';
import threadsReducer, {
  initialState,
  setComment,
  setDownVoteComment,
  setDownVoteThread,
  setNeutralVoteComment,
  setNeutralVoteThread,
  setStatusFetch,
  setUpVoteComment,
  setUpVoteThread,
} from '../../../src/rtk/slices/threadSlice.ts';

describe('The Thread Reducer', () => {
  let initialStateTest: {
    thread: TThreadResponse;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null | undefined;
  };

  afterEach(() => {
    initialStateTest = {
      thread: {
        data: {
          detailThread: {
            id: 'thread-1',
            title: 'A First Thread',
            body: 'This is a first thread',
            category: 'General',
            createdAt: '2021-06-21T07:00:00.000Z',
            owner: {
              id: 'users-1',
              name: 'John Doe',
              avatar:
                '"https://ui-avatars.com/api/?name=John%20Doe&background=random"',
            },
            upVotesBy: [],
            downVotesBy: [],
            comments: [
              {
                id: 'comment-1',
                content: 'This is a first comment',
                createdAt: '2021-06-21T07:00:00.000Z',
                owner: {
                  id: 'users-1',
                  name: 'John Doe',
                  avatar:
                    'https://ui-avatars.com/api/?name=John%20Doe&background=random',
                },
                upVotesBy: [],
                downVotesBy: [],
              },
            ],
          },
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

  test('should add an user id into a thread when up voting list', () => {
    expect(
      threadsReducer(
        initialStateTest,
        setUpVoteThread({
          profileId: 'users-10',
        }),
      ),
    ).toEqual({
      thread: {
        ...initialStateTest.thread,
        data: {
          detailThread: {
            ...initialStateTest.thread.data.detailThread,
            upVotesBy: ['users-10'],
          },
        },
      },
      status: 'succeeded',
      error: null,
    });
  });

  test('should add an user id into a thread when down voting list', () => {
    expect(
      threadsReducer(
        initialStateTest,
        setDownVoteThread({
          profileId: 'users-10',
        }),
      ),
    ).toEqual({
      thread: {
        ...initialStateTest.thread,
        data: {
          detailThread: {
            ...initialStateTest.thread.data.detailThread,
            downVotesBy: ['users-10'],
          },
        },
      },
      status: 'succeeded',
      error: null,
    });
  });

  test('should remove an user id in upVotesBy list when down voting', () => {
    initialStateTest.thread.data.detailThread.upVotesBy = ['users-10'];

    expect(
      threadsReducer(
        initialStateTest,
        setDownVoteThread({
          profileId: 'users-10',
        }),
      ),
    ).toEqual({
      thread: {
        ...initialStateTest.thread,
        data: {
          detailThread: {
            ...initialStateTest.thread.data.detailThread,
            upVotesBy: [],
            downVotesBy: ['users-10'],
          },
        },
      },
      status: 'succeeded',
      error: null,
    });
  });

  test('should remove an user id in downVotesBy list when up voting a thread', () => {
    initialStateTest.thread.data.detailThread.downVotesBy = ['users-10'];

    expect(
      threadsReducer(
        initialStateTest,
        setUpVoteThread({
          profileId: 'users-10',
        }),
      ),
    ).toEqual({
      thread: {
        ...initialStateTest.thread,
        data: {
          detailThread: {
            ...initialStateTest.thread.data.detailThread,
            upVotesBy: ['users-10'],
            downVotesBy: [],
          },
        },
      },
      status: 'succeeded',
      error: null,
    });
  });

  test('should remove an user id in upVotesBy and downVotesBy list when neutral voting a thread', () => {
    const expectedResult = {
      thread: {
        ...initialStateTest.thread,
        data: {
          detailThread: {
            ...initialStateTest.thread.data.detailThread,
            upVotesBy: [],
            downVotesBy: [],
          },
        },
      },
      status: 'succeeded',
      error: null,
    };

    initialStateTest.thread.data.detailThread.upVotesBy = ['users-10'];
    initialStateTest.thread.data.detailThread.downVotesBy = [];

    expect(
      threadsReducer(
        initialStateTest,
        setNeutralVoteThread({
          profileId: 'users-10',
        }),
      ),
    ).toEqual(expectedResult);

    initialStateTest.thread.data.detailThread.upVotesBy = [];
    initialStateTest.thread.data.detailThread.downVotesBy = ['users-10'];

    expect(
      threadsReducer(
        initialStateTest,
        setNeutralVoteThread({
          profileId: 'users-10',
        }),
      ),
    ).toEqual(expectedResult);
  });

  test('should add an user id into a comment when up voting list', () => {
    expect(
      threadsReducer(
        initialStateTest,
        setUpVoteComment({
          commentId: 'comment-1',
          profileId: 'users-10',
        }),
      ),
    ).toEqual({
      thread: {
        ...initialStateTest.thread,
        data: {
          detailThread: {
            ...initialStateTest.thread.data.detailThread,
            comments: [
              {
                ...initialStateTest.thread.data.detailThread.comments[0],
                upVotesBy: ['users-10'],
              },
            ],
          },
        },
      },
      status: 'succeeded',
      error: null,
    });
  });

  test('should add an user id into a comment when down voting list', () => {
    expect(
      threadsReducer(
        initialStateTest,
        setDownVoteComment({
          commentId: 'comment-1',
          profileId: 'users-10',
        }),
      ),
    ).toEqual({
      thread: {
        ...initialStateTest.thread,
        data: {
          detailThread: {
            ...initialStateTest.thread.data.detailThread,
            comments: [
              {
                ...initialStateTest.thread.data.detailThread.comments[0],
                downVotesBy: ['users-10'],
              },
            ],
          },
        },
      },
      status: 'succeeded',
      error: null,
    });
  });

  test('should remove an user id in upVotesBy list when down voting a comment', () => {
    initialStateTest.thread.data.detailThread.comments[0].upVotesBy = [
      'users-10',
    ];

    expect(
      threadsReducer(
        initialStateTest,
        setDownVoteComment({
          commentId: 'comment-1',
          profileId: 'users-10',
        }),
      ),
    ).toEqual({
      thread: {
        ...initialStateTest.thread,
        data: {
          detailThread: {
            ...initialStateTest.thread.data.detailThread,
            comments: [
              {
                ...initialStateTest.thread.data.detailThread.comments[0],
                upVotesBy: [],
                downVotesBy: ['users-10'],
              },
            ],
          },
        },
      },
      status: 'succeeded',
      error: null,
    });
  });

  test('should remove an user id in downVotesBy list when up voting a comment', () => {
    initialStateTest.thread.data.detailThread.comments[0].downVotesBy = [
      'users-10',
    ];

    expect(
      threadsReducer(
        initialStateTest,
        setUpVoteComment({
          commentId: 'comment-1',
          profileId: 'users-10',
        }),
      ),
    ).toEqual({
      thread: {
        ...initialStateTest.thread,
        data: {
          detailThread: {
            ...initialStateTest.thread.data.detailThread,
            comments: [
              {
                ...initialStateTest.thread.data.detailThread.comments[0],
                upVotesBy: ['users-10'],
                downVotesBy: [],
              },
            ],
          },
        },
      },
      status: 'succeeded',
      error: null,
    });
  });

  test('should remove an user id in upVotesBy and downVotesBy list when neutral voting a comment', () => {
    const expectedResult = {
      thread: {
        ...initialStateTest.thread,
        data: {
          detailThread: {
            ...initialStateTest.thread.data.detailThread,
            comments: [
              {
                ...initialStateTest.thread.data.detailThread.comments[0],
                upVotesBy: [],
                downVotesBy: [],
              },
            ],
          },
        },
      },
      status: 'succeeded',
      error: null,
    };

    initialStateTest.thread.data.detailThread.comments[0].upVotesBy = [
      'users-10',
    ];
    initialStateTest.thread.data.detailThread.comments[0].downVotesBy = [];

    expect(
      threadsReducer(
        initialStateTest,
        setNeutralVoteComment({
          commentId: 'comment-1',
          profileId: 'users-10',
        }),
      ),
    ).toEqual(expectedResult);

    initialStateTest.thread.data.detailThread.comments[0].upVotesBy = [];
    initialStateTest.thread.data.detailThread.comments[0].downVotesBy = [
      'users-10',
    ];

    expect(
      threadsReducer(
        initialStateTest,
        setNeutralVoteComment({
          commentId: 'comment-1',
          profileId: 'users-10',
        }),
      ),
    ).toEqual(expectedResult);
  });

  test('should add a new comment to the store', () => {
    const newComment = {
      id: 'comment-2',
      owner: {
        id: 'user-y',
        name: 'Automation Testing',
        avatar:
          'https://ui-avatars.com/api/?name=Automation%20Testing&background=random',
      },
      content: 'This is a new comment',
      createdAt: new Date().toISOString(),
      upVotesBy: [],
      downVotesBy: [],
    };

    expect(threadsReducer(initialStateTest, setComment(newComment))).toEqual({
      thread: {
        ...initialStateTest.thread,
        data: {
          detailThread: {
            ...initialStateTest.thread.data.detailThread,
            comments: [
              newComment,
              ...initialStateTest.thread.data.detailThread.comments,
            ],
          },
        },
      },
      status: 'succeeded',
      error: null,
    });
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
