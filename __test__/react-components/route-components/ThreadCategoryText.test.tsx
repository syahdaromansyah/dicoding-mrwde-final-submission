/* eslint-disable import/no-extraneous-dependencies */
import '@testing-library/jest-dom/vitest';
import { cleanup, screen } from '@testing-library/react';
import React from 'react';
import { afterEach, describe, expect, test } from 'vitest';
import ThreadCategoryText from '../../../src/routes-components/ThreadCategoryText.tsx';
import renderWithProvider from '../_utils/custom-redux-wrapper.tsx';

/**
 * Integration Test Scenarios
 * ~ The Threads Categories Component Test
 *    - Should show the category text in lowercase form
 *    - Should remove the whitespace of a category text
 */

describe('The Threads Categories Component Test', () => {
  afterEach(() => {
    cleanup();
  });

  test('Should show the category text in lowercase form', () => {
    renderWithProvider(
      <ThreadCategoryText>ThreadCategoryText</ThreadCategoryText>,
    );

    expect(screen.getByText('#threadcategorytext')).toBeInTheDocument();
  });

  test('Should remove the whitespace of a category text', () => {
    renderWithProvider(
      <ThreadCategoryText>Thread Category Text</ThreadCategoryText>,
    );

    expect(screen.getByText('#threadcategorytext')).toBeInTheDocument();
  });
});
