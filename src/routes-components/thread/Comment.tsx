import type { TCommentData, TProfileData, TUsersData } from '@/types/types';
import { formatDistance } from 'date-fns';
import type { MouseEventHandler } from 'react';
import MarkdownContent from '../../components/MarkdownContent';
import DownVoteButton from '../DownVoteButton';
import UpVoteButton from '../UpVoteButton';

export default function Comment({
  profile,
  dataUsers,
  comment,
  handleUpVoteComment,
  handleDownVoteComment,
}: Readonly<{
  profile: TProfileData;
  dataUsers: TUsersData;
  comment: TCommentData;
  handleUpVoteComment: MouseEventHandler<HTMLButtonElement> | undefined;
  handleDownVoteComment: MouseEventHandler<HTMLButtonElement> | undefined;
}>) {
  return (
    <div className="rounded-md p-4 dark:bg-gray-950">
      <div className="flex items-center justify-between">
        <h2 className="font-poppins mb-2 flex items-center gap-x-2 text-xl font-semibold">
          <img
            className="block w-6 rounded-full"
            src={
              dataUsers
                ? dataUsers.find((user) => user.id === comment.owner.id)?.avatar
                : ''
            }
            alt={`${
              dataUsers
                ? dataUsers.find((user) => user.id === comment.owner.id)?.avatar
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
          <UpVoteButton
            profile={profile}
            upVotesBy={comment.upVotesBy}
            handleUpVoteThread={handleUpVoteComment}
          />
        </div>

        <div>
          <DownVoteButton
            profile={profile}
            downVotesBy={comment.downVotesBy}
            handleDownVoteThread={handleDownVoteComment}
          />
        </div>
      </div>
    </div>
  );
}
