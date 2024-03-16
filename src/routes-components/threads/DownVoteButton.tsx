import useProfileSlice from '@/hooks/useProfileSlice';
import type { TThreadsSingleData } from '@/types/types';
import cn from 'classnames';
import type { MouseEventHandler } from 'react';
import { MdOutlineThumbDown } from 'react-icons/md';

export default function DownVoteButton({
  thread,
  handleDownVoteThread,
}: Readonly<{
  thread: TThreadsSingleData;
  handleDownVoteThread: (
    threadId: string,
  ) => MouseEventHandler<HTMLButtonElement>;
}>) {
  const { profile } = useProfileSlice();

  return (
    <p>
      <button
        className={cn(
          'flex items-center justify-center gap-x-1 rounded-md px-2 py-1 transition hover:bg-gray-200 dark:hover:bg-gray-600',
          {
            'dark:bg-gray-600': thread.downVotesBy.find(
              (downVoteBy) => downVoteBy === profile.id,
            ),
          },
          {
            'bg-gray-200': thread.downVotesBy.find(
              (downVoteBy) => downVoteBy === profile.id,
            ),
          },
        )}
        type="button"
        onClick={handleDownVoteThread(thread.id)}
      >
        <span className="inline-block text-xl">
          <MdOutlineThumbDown />
        </span>
        {thread.downVotesBy.length}
      </button>
    </p>
  );
}
