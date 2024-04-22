/* eslint-disable import/no-extraneous-dependencies */
import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import React from 'react';
import DownVoteButton from '../../routes-components/DownVoteButton';
import sleepTimer from '../_helpers/sleepTimer';

const meta: Meta<typeof DownVoteButton> = {
  title: 'Route Component/DownVoteButton',
  component: DownVoteButton,
  args: {
    profile: {
      id: 'user-1',
      name: 'Foo Doe',
      email: 'foodoe@email.com',
      avatar: new URL(
        'https://ui-avatars.com/api/?name=Foo Doe&background=random',
      ).href,
    },
    downVotesBy: [],
    handleDownVoteThread() {},
  },
  parameters: {
    layout: 'centered',
  },
  render: function Render({ ...args }) {
    const [{ downVotesBy }, updateArgs] = useArgs<typeof args>();

    const handleDownVoteThread = () => {
      if (downVotesBy.includes('user-1')) {
        updateArgs({
          downVotesBy: downVotesBy.filter(
            (downVoteBy) => downVoteBy !== 'user-1',
          ),
        });

        return;
      }

      updateArgs({
        downVotesBy: ['user-1', ...downVotesBy],
      });
    };

    return (
      <div className="flex h-[100px] w-[100px] items-center justify-center rounded-md bg-gray-900 text-gray-100">
        <DownVoteButton
          {...args}
          downVotesBy={downVotesBy}
          handleDownVoteThread={handleDownVoteThread}
        />
      </div>
    );
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const EmptyDownVote: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    const { downVotesBy } = args;

    // Resetting the down votes data
    if (downVotesBy.includes('user-1')) {
      await userEvent.click(canvas.getByRole('button'));
      await sleepTimer(300);

      await expect(canvas.getByRole('button')).toHaveTextContent(
        'Total down votes is 0',
      );
    }

    // Testing to down voting the down vote button
    await userEvent.click(canvas.getByRole('button'));
    await sleepTimer(300);

    await expect(canvas.getByRole('button')).toHaveTextContent(
      'Total down votes is 1',
    );

    // Testing to cancel down voting the down vote button
    await userEvent.click(canvas.getByRole('button'));
    await sleepTimer(300);

    await expect(canvas.getByRole('button')).toHaveTextContent(
      'Total down votes is 0',
    );
  },
};

export const NonEmptyDownVote: Story = {
  args: {
    downVotesBy: ['user-2', 'user-3'],
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    const { downVotesBy } = args;

    // Resetting the down votes data
    if (downVotesBy.includes('user-1')) {
      await userEvent.click(canvas.getByRole('button'));
      await sleepTimer(300);

      await expect(canvas.getByRole('button')).toHaveTextContent(
        'Total down votes is 2',
      );
    }

    // Testing to down voting the down vote button
    await userEvent.click(canvas.getByRole('button'));
    await sleepTimer(300);

    await expect(canvas.getByRole('button')).toHaveTextContent(
      'Total down votes is 3',
    );

    // Testing to cancel down voting the down vote button
    await userEvent.click(canvas.getByRole('button'));
    await sleepTimer(300);

    await expect(canvas.getByRole('button')).toHaveTextContent(
      'Total down votes is 2',
    );
  },
};
