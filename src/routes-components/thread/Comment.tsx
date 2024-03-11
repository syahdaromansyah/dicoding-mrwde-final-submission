import useAuthSlice from '@/hooks/useAuthSlice';
import type { TCommentData, TUsersResponse } from '@/types/types';
import cn from 'classnames';
import { formatDistance } from 'date-fns';
import type { MouseEventHandler } from 'react';
import { MdOutlineThumbDown, MdOutlineThumbUp } from 'react-icons/md';
import MarkdownContent from '../../components/MarkdownContent';

export default function Comment({
  dataUsers,
  comment,
  handleUpVoteComment,
  handleDownVoteComment,
}: Readonly<{
  dataUsers: TUsersResponse;
  comment: TCommentData;
  handleUpVoteComment: (
    commentId: string,
  ) => MouseEventHandler<HTMLButtonElement>;
  handleDownVoteComment: (
    commentId: string,
  ) => MouseEventHandler<HTMLButtonElement>;
}>) {
  const { auth } = useAuthSlice();

  return (
    <div className="rounded-md p-4 dark:bg-gray-950">
      <div className="flex items-center justify-between">
        <h2 className="font-poppins mb-2 flex items-center gap-x-2 text-xl font-semibold">
          <img
            className="block w-6 rounded-full"
            src={
              dataUsers
                ? dataUsers.data.users.find(
                    (user) => user.id === comment.owner.id,
                  )?.avatar
                : ''
            }
            alt={`${
              dataUsers
                ? dataUsers.data.users.find(
                    (user) => user.id === comment.owner.id,
                  )?.avatar
                : ''
            } profile`}
          />

          {comment.owner.name}
        </h2>

        <div>
          <time
            dateTime={formatDistance(comment.createdAt, new Date(), {
              addSuffix: true,
            })}
          >
            {formatDistance(comment.createdAt, new Date(), {
              addSuffix: true,
            })}
          </time>
        </div>
      </div>

      <div className="mb-2">
        <MarkdownContent>{comment.content}</MarkdownContent>
      </div>

      <div className="flex items-center gap-x-4">
        <div>
          <p>
            <button
              className={cn(
                'flex items-center justify-center gap-x-1 rounded-md p-1 transition hover:bg-gray-200 dark:hover:bg-gray-600',
                {
                  'dark:bg-gray-600': comment.upVotesBy.find(
                    (upVoteBy) => upVoteBy === auth.id,
                  ),
                },
                {
                  'bg-gray-200': comment.upVotesBy.find(
                    (upVoteBy) => upVoteBy === auth.id,
                  ),
                },
              )}
              type="button"
              onClick={handleUpVoteComment(comment.id)}
            >
              <span className="inline-block text-xl">
                <MdOutlineThumbUp />
              </span>
              {comment.upVotesBy.length}
            </button>
          </p>
        </div>

        <div>
          <p>
            <button
              className={cn(
                'flex items-center justify-center gap-x-1 rounded-md p-1 transition hover:bg-gray-200 dark:hover:bg-gray-600',
                {
                  'dark:bg-gray-600': comment.downVotesBy.find(
                    (downVoteBy) => downVoteBy === auth.id,
                  ),
                },
                {
                  'bg-gray-200': comment.downVotesBy.find(
                    (downVoteBy) => downVoteBy === auth.id,
                  ),
                },
              )}
              type="button"
              onClick={handleDownVoteComment(comment.id)}
            >
              <span className="inline-block text-xl">
                <MdOutlineThumbDown />
              </span>
              {comment.downVotesBy.length}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
