/* eslint-disable import/no-extraneous-dependencies */
import '@testing-library/jest-dom/vitest';
import { cleanup, screen } from '@testing-library/react';
import React from 'react';
import { afterEach, describe, expect, test } from 'vitest';
import Comment from '../../../../src/routes-components/thread/Comment.tsx';
import renderWithProvider from '../../_utils/custom-redux-wrapper.tsx';

/**
 * Integration Test Scenarios
 * ~ The Comment Component Test
 *    - Should show contents of a commentary
 */

const profileDummy = {
  id: '',
  name: '',
  email: '',
  avatar: '',
};

const sampleUsers = [
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
    id: 'rin_doe',
    name: 'Rin Doe',
    email: 'rin@example.com',
    avatar: 'https://generated-image-url.jpg',
  },
];

describe('The Comment Component Test', () => {
  afterEach(() => {
    cleanup();
  });

  test('Should show contents of a commentary', async () => {
    const sampleComment = {
      id: 'comment-1',
      content: 'This is a first commentary from Vin Doe',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-20',
        name: 'Vin Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: ['users-1', 'users-2', 'users-3'],
      downVotesBy: ['users-4', 'users-5'],
    };

    renderWithProvider(
      <Comment
        profile={profileDummy}
        comment={sampleComment}
        dataUsers={sampleUsers}
        handleUpVoteComment={() => null}
        handleDownVoteComment={() => null}
      />,
    );

    expect(screen.getByRole('heading')).toHaveTextContent('Vin Doe');

    await screen.findByText('This is a first commentary from Vin Doe');

    expect(screen.getAllByRole('button').length).toBe(2);

    expect(screen.getAllByRole('button')[0]).toHaveTextContent(
      'Total up votes is 3',
    );

    expect(screen.getAllByRole('button')[1]).toHaveTextContent(
      'Total down votes is 2',
    );
  });
});
