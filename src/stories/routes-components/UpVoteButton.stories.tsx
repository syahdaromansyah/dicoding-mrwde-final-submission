/* eslint-disable import/no-extraneous-dependencies */
import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import React from 'react';
import UpVoteButton from '../../routes-components/UpVoteButton';
import sleepTimer from '../_helpers/sleepTimer.ts';

const meta: Meta<typeof UpVoteButton> = {
  title: 'Route Component/UpVoteButton',
  component: UpVoteButton,
  args: {
    profile: {
      id: 'user-1',
      name: 'Foo Doe',
      email: 'foodoe@email.com',
      avatar: new URL(
        'https://ui-avatars.com/api/?name=Foo Doe&background=random',
      ).href,
    },
    upVotesBy: [],
    handleUpVoteThread() {},
  },
  parameters: {
    layout: 'centered',
  },
  render: function Render({ ...args }) {
    const [{ upVotesBy }, updateArgs] = useArgs<typeof args>();

    const handleUpVoteThread = () => {
      if (upVotesBy.includes('user-1')) {
        updateArgs({
          upVotesBy: upVotesBy.filter((upVoteBy) => upVoteBy !== 'user-1'),
        });

        return;
      }

      updateArgs({
        upVotesBy: ['user-1', ...upVotesBy],
      });
    };

    return (
      <div className="flex h-[100px] w-[100px] items-center justify-center rounded-md bg-gray-900 text-gray-100">
        <UpVoteButton {...args} handleUpVoteThread={handleUpVoteThread} />
      </div>
    );
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const EmptyUpVote: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    const { upVotesBy } = args;

    // Resetting the up votes data
    if (upVotesBy.includes('user-1')) {
      await userEvent.click(canvas.getByRole('button'));
      await sleepTimer(300);

      await expect(canvas.getByRole('button')).toHaveTextContent(
        'Total up votes is 0',
      );
    }

    // Testing to up voting the up vote button
    await userEvent.click(canvas.getByRole('button'));
    await sleepTimer(300);

    await expect(canvas.getByRole('button')).toHaveTextContent(
      'Total up votes is 1',
    );

    // Testing to cancel up voting the up vote button
    await userEvent.click(canvas.getByRole('button'));
    await sleepTimer(300);

    await expect(canvas.getByRole('button')).toHaveTextContent(
      'Total up votes is 0',
    );
  },
};

export const NonEmptyUpVote: Story = {
  args: {
    upVotesBy: ['user-2', 'user-3'],
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    const { upVotesBy } = args;

    // Resetting the up votes data
    if (upVotesBy.includes('user-1')) {
      await userEvent.click(canvas.getByRole('button'));
      await sleepTimer(300);

      await expect(canvas.getByRole('button')).toHaveTextContent(
        'Total up votes is 2',
      );
    }

    // Testing to up voting the up vote button
    await userEvent.click(canvas.getByRole('button'));
    await sleepTimer(300);

    await expect(canvas.getByRole('button')).toHaveTextContent(
      'Total up votes is 3',
    );

    // Testing to cancel up voting the up vote button
    await userEvent.click(canvas.getByRole('button'));
    await sleepTimer(300);

    await expect(canvas.getByRole('button')).toHaveTextContent(
      'Total up votes is 2',
    );
  },
};
