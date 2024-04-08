import { configureStore } from '@reduxjs/toolkit';
import { fetchThread } from '../../../src/rtk/slices/threadSlice';
// eslint-disable-next-line import/no-extraneous-dependencies
import { afterAll, describe, expect, test, vi } from 'vitest';

const threadResponseData = {
  data: {
    status: 'success',
    message: 'ok',
    data: {
      detailThread: {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        owner: {
          id: 'users-1',
          name: 'John Doe',
          avatar: 'https://generated-image-url.jpg',
        },
        upVotesBy: [],
        downVotesBy: [],
        comments: [
          {
            id: 'comment-1',
            content: 'Ini adalah komentar pertama',
            createdAt: '2021-06-21T07:00:00.000Z',
            owner: {
              id: 'users-2',
              name: 'Mariana Doe',
              avatar: 'https://generated-image-url.jpg',
            },
            upVotesBy: [],
            downVotesBy: [],
          },
        ],
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
    getThread: () => Promise.resolve(threadResponseData),
  };
});

describe('The Thread Thunk Function', () => {
  afterAll(() => {
    vi.doUnmock('../../../src/network-data/network-data.ts');
  });

  test('should return the thread response to store when fetching is fulfilled', async () => {
    const threadStore = configureStore({
      reducer(state, action) {
        if (action.type === 'thread/fetchThread/fulfilled') {
          return action.payload;
        }

        return {
          data: {
            detailThread: {
              id: '',
              title: '',
              body: '',
              category: '',
              createdAt: '',
              owner: {
                id: '',
                name: '',
                avatar: '',
              },
              upVotesBy: [],
              downVotesBy: [],
              comments: [],
            },
          },
          message: '',
          status: '',
        };
      },
    });

    const dispatchResult = await threadStore.dispatch(fetchThread('thread-1'));

    expect(dispatchResult.type).toBe('thread/fetchThread/fulfilled');

    const state = threadStore.getState();

    expect(state).toEqual(threadResponseData.data);
  });
});
