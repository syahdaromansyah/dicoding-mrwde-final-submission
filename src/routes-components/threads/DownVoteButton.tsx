import useAuthSlice from '@/hooks/useAuthSlice';
import type { TThreadsData } from '@/types/types';
import cn from 'classnames';
import type { MouseEventHandler } from 'react';
import { MdOutlineThumbDown } from 'react-icons/md';

export default function DownVoteButton({
  thread,
  handleDownVoteThread,
}: Readonly<{
  thread: TThreadsData;
  handleDownVoteThread: (
    threadId: string,
  ) => MouseEventHandler<HTMLButtonElement>;
}>) {
  const { auth } = useAuthSlice();

  return (
    <p>
      <button
        className={cn(
          'flex items-center justify-center gap-x-1 rounded-md px-2 py-1 transition hover:bg-gray-200 dark:hover:bg-gray-600',
          {
            'dark:bg-gray-600': thread.downVotesBy.find(
              (downVoteBy) => downVoteBy === auth.id,
            ),
          },
          {
            'bg-gray-200': thread.downVotesBy.find(
              (downVoteBy) => downVoteBy === auth.id,
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
