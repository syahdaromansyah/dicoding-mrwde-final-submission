/* eslint-disable import/no-extraneous-dependencies */
import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import React from 'react';
import Comment from '../../../routes-components/thread/Comment';
import type { TCommentData } from '../../../types/types.ts';
import sleepTimer from '../../_helpers/sleepTimer';

const commentPartData: Omit<TCommentData, 'upVotesBy' | 'downVotesBy'> = {
  id: 'comment-1',
  content: 'Hello everyone! My name is Bar',
  createdAt: new Date().toISOString(),
  owner: {
    id: 'user-2',
    name: 'Bar Doe',
    avatar: new URL(
      'https://ui-avatars.com/api/?name=Bar Doe&background=random',
    ).href,
  },
};

const meta: Meta<typeof Comment> = {
  title: 'Route Component/Thread/Comment',
  component: Comment,
  args: {
    profile: {
      id: 'user-1',
      name: 'Foo Doe',
      email: 'foodoe@email.com',
      avatar: new URL(
        'https://ui-avatars.com/api/?name=Foo Doe&background=random',
      ).href,
    },
    comment: {
      ...commentPartData,
      owner: {
        ...commentPartData.owner,
      },
      upVotesBy: [],
      downVotesBy: [],
    },
    dataUsers: [
      {
        id: 'user-1',
        name: 'Foo Doe',
        email: 'foodoe@email.com',
        avatar: new URL(
          'https://ui-avatars.com/api/?name=Foo Doe&background=random',
        ).href,
      },
      {
        id: 'user-2',
        name: 'Bar Doe',
        email: 'bardoe@email.com',
        avatar: new URL(
          'https://ui-avatars.com/api/?name=Bar Doe&background=random',
        ).href,
      },
    ],
    handleUpVoteComment() {},
    handleDownVoteComment() {},
  },
  parameters: {
    layout: 'centered',
  },
  render: function Render({ ...args }) {
    const [{ comment }, updateArgs] = useArgs<typeof args>();

    const handleUpVoteComment = () => {
      if (comment.upVotesBy.includes('user-1')) {
        updateArgs({
          comment: {
            ...comment,
            upVotesBy: comment.upVotesBy.filter(
              (upVoteBy) => upVoteBy !== 'user-1',
            ),
          },
        });

        return;
      }

      updateArgs({
        comment: {
          ...comment,
          upVotesBy: ['user-1', ...comment.upVotesBy],
          downVotesBy: comment.downVotesBy.filter(
            (downVoteBy) => downVoteBy !== 'user-1',
          ),
        },
      });
    };

    const handleDownVoteComment = () => {
      if (comment.downVotesBy.includes('user-1')) {
        updateArgs({
          comment: {
            ...comment,
            downVotesBy: comment.downVotesBy.filter(
              (downVoteBy) => downVoteBy !== 'user-1',
            ),
          },
        });

        return;
      }

      updateArgs({
        comment: {
          ...comment,
          downVotesBy: ['user-1', ...comment.downVotesBy],
          upVotesBy: comment.upVotesBy.filter(
            (upVoteBy) => upVoteBy !== 'user-1',
          ),
        },
      });
    };

    return (
      <div className="w-[826px] dark:text-gray-100">
        <Comment
          {...args}
          comment={comment}
          handleUpVoteComment={handleUpVoteComment}
          handleDownVoteComment={handleDownVoteComment}
        />
      </div>
    );
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const CommentCardWithNoVotes: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    const { comment } = args;

    const [upVoteBtnElem, downVoteBtnElem] = canvas.getAllByRole('button');

    // Resetting up votes and down votes button
    if (comment.upVotesBy.includes('user-1')) {
      await userEvent.click(upVoteBtnElem);
      await sleepTimer(300);

      await expect(upVoteBtnElem).toHaveTextContent('Total up votes is 0');
    }

    if (comment.downVotesBy.includes('user-1')) {
      await userEvent.click(downVoteBtnElem);
      await sleepTimer(300);

      await expect(downVoteBtnElem).toHaveTextContent('Total down votes is 0');
    }
    // Testing to up vote comment
    await userEvent.click(upVoteBtnElem);
    await sleepTimer(300);

    await expect(upVoteBtnElem).toHaveTextContent('Total up votes is 1');

    // Testing to cancel up vote comment
    await userEvent.click(upVoteBtnElem);
    await sleepTimer(300);

    await expect(upVoteBtnElem).toHaveTextContent('Total up votes is 0');

    // Testing to down vote comment
    await userEvent.click(downVoteBtnElem);
    await sleepTimer(300);

    await expect(downVoteBtnElem).toHaveTextContent('Total down votes is 1');

    // Testing to cancel down vote comment
    await userEvent.click(downVoteBtnElem);
    await sleepTimer(300);

    await expect(downVoteBtnElem).toHaveTextContent('Total down votes is 0');

    // Removing user profile from down votes button
    // when up voting comment
    await userEvent.click(downVoteBtnElem);
    await sleepTimer(300);

    await userEvent.click(upVoteBtnElem);
    await sleepTimer(300);

    await expect(upVoteBtnElem).toHaveTextContent('Total up votes is 1');
    await expect(downVoteBtnElem).toHaveTextContent('Total down votes is 0');

    // Removing user profile from up votes button
    // when down voting comment
    await userEvent.click(downVoteBtnElem);
    await sleepTimer(300);

    await expect(upVoteBtnElem).toHaveTextContent('Total up votes is 0');
    await expect(downVoteBtnElem).toHaveTextContent('Total down votes is 1');
  },
};

export const CommentCardWithVotes: Story = {
  args: {
    comment: {
      ...commentPartData,
      owner: {
        ...commentPartData.owner,
      },
      upVotesBy: ['user-3', 'user-4'],
      downVotesBy: ['user-5', 'user-6', 'user-7'],
    },
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    const { comment } = args;

    const [upVoteBtnElem, downVoteBtnElem] = canvas.getAllByRole('button');

    // Resetting up votes and down votes button
    if (comment.upVotesBy.includes('user-1')) {
      await userEvent.click(upVoteBtnElem);
      await sleepTimer(300);

      await expect(upVoteBtnElem).toHaveTextContent('Total up votes is 2');
    }

    if (comment.downVotesBy.includes('user-1')) {
      await userEvent.click(downVoteBtnElem);
      await sleepTimer(300);

      await expect(downVoteBtnElem).toHaveTextContent('Total down votes is 3');
    }
    // Testing to up vote comment
    await userEvent.click(upVoteBtnElem);
    await sleepTimer(300);

    await expect(upVoteBtnElem).toHaveTextContent('Total up votes is 3');

    // Testing to cancel up vote comment
    await userEvent.click(upVoteBtnElem);
    await sleepTimer(300);

    await expect(upVoteBtnElem).toHaveTextContent('Total up votes is 2');

    // Testing to down vote comment
    await userEvent.click(downVoteBtnElem);
    await sleepTimer(300);

    await expect(downVoteBtnElem).toHaveTextContent('Total down votes is 4');

    // Testing to cancel down vote comment
    await userEvent.click(downVoteBtnElem);
    await sleepTimer(300);

    await expect(downVoteBtnElem).toHaveTextContent('Total down votes is 3');

    // Removing user profile from down votes button
    // when up voting comment
    await userEvent.click(downVoteBtnElem);
    await sleepTimer(300);

    await userEvent.click(upVoteBtnElem);
    await sleepTimer(300);

    await expect(upVoteBtnElem).toHaveTextContent('Total up votes is 3');
    await expect(downVoteBtnElem).toHaveTextContent('Total down votes is 3');

    // Removing user profile from up votes button
    // when down voting comment
    await userEvent.click(downVoteBtnElem);
    await sleepTimer(300);

    await expect(upVoteBtnElem).toHaveTextContent('Total up votes is 2');
    await expect(downVoteBtnElem).toHaveTextContent('Total down votes is 4');
  },
};
