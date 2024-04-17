/* eslint-disable import/no-extraneous-dependencies */
import '@testing-library/jest-dom/vitest';
import { cleanup, screen } from '@testing-library/react';
import React from 'react';
import { afterEach, describe, expect, test } from 'vitest';
import UpVoteButton from '../../../src/routes-components/UpVoteButton.tsx';
import renderWithProvider from '../_utils/custom-redux-wrapper.tsx';

/**
 * Integration Test Scenarios
 * ~ The Up Vote Button Component Test
 *    - Should show zero users vote
 *    - Should show some numbers of users vote
 */

const profileDummy = {
  id: '',
  name: '',
  email: '',
  avatar: '',
};

describe('The Up Vote Button Component Test', () => {
  afterEach(() => {
    cleanup();
  });

  test('Should show zero users vote', () => {
    renderWithProvider(
      <UpVoteButton
        profile={profileDummy}
        upVotesBy={[]}
        handleUpVoteThread={() => null}
      />,
    );

    expect(screen.getByRole('button')).toHaveTextContent('Total up votes is 0');
  });

  test('Should show some numbers of users vote', () => {
    renderWithProvider(
      <UpVoteButton
        profile={profileDummy}
        upVotesBy={['users-2', 'users-3']}
        handleUpVoteThread={() => null}
      />,
    );

    expect(screen.getByRole('button')).toHaveTextContent('Total up votes is 2');
  });
});
