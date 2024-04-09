/* eslint-disable import/no-extraneous-dependencies */
import '@testing-library/jest-dom/vitest';
import { cleanup, screen } from '@testing-library/react';
import React from 'react';
import { afterEach, describe, expect, test } from 'vitest';
import DownVoteButton from '../../../src/routes-components/DownVoteButton.tsx';
import renderWithProvider from '../_utils/custom-redux-wrapper.tsx';

const profileDummy = {
  id: '',
  name: '',
  email: '',
  avatar: '',
};

describe('The Down Vote Button Component', () => {
  afterEach(() => {
    cleanup();
  });

  test('Should show zero users vote', () => {
    renderWithProvider(
      <DownVoteButton
        profile={profileDummy}
        downVotesBy={[]}
        handleDownVoteThread={() => null}
      />,
    );

    expect(screen.getByRole('button')).toHaveTextContent(
      'Total down votes is 0',
    );
  });

  test('Should show some numbers of users vote', () => {
    renderWithProvider(
      <DownVoteButton
        profile={profileDummy}
        downVotesBy={['users-4', 'users-5', 'users-6']}
        handleDownVoteThread={() => null}
      />,
    );

    expect(screen.getByRole('button')).toHaveTextContent(
      'Total down votes is 3',
    );
  });
});
