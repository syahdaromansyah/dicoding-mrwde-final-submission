import useProfileSlice from '@/hooks/useProfileSlice';
import type { TThreadsSingleData } from '@/types/types';
import cn from 'classnames';
import type { MouseEventHandler } from 'react';
import { MdOutlineThumbUp } from 'react-icons/md';

export default function UpVoteButton({
  thread,
  handleUpVoteThread,
}: Readonly<{
  thread: TThreadsSingleData;
  handleUpVoteThread: (
    threadId: string,
  ) => MouseEventHandler<HTMLButtonElement>;
}>) {
  const { profile } = useProfileSlice();

  return (
    <p>
      <button
        className={cn(
          'flex items-center justify-center gap-x-1 rounded-md px-2 py-1 transition hover:bg-indigo-300 dark:hover:bg-indigo-600',
          {
            'dark:bg-indigo-600': thread.upVotesBy.find(
              (upVoteBy) => upVoteBy === profile.id,
            ),
          },
          {
            'bg-indigo-300': thread.upVotesBy.find(
              (upVoteBy) => upVoteBy === profile.id,
            ),
          },
        )}
        type="button"
        onClick={handleUpVoteThread(thread.id)}
      >
        <span className="inline-block text-xl">
          <MdOutlineThumbUp />
        </span>
        {thread.upVotesBy.length}
      </button>
    </p>
  );
}
