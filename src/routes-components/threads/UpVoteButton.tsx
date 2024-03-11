import useAuthSlice from '@/hooks/useAuthSlice';
import type { TThreadsData } from '@/types/types';
import cn from 'classnames';
import type { MouseEventHandler } from 'react';
import { MdOutlineThumbUp } from 'react-icons/md';

export default function UpVoteButton({
  thread,
  handleUpVoteThread,
}: Readonly<{
  thread: TThreadsData;
  handleUpVoteThread: (
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
            'dark:bg-gray-600': thread.upVotesBy.find(
              (upVoteBy) => upVoteBy === auth.id,
            ),
          },
          {
            'bg-gray-200': thread.upVotesBy.find(
              (upVoteBy) => upVoteBy === auth.id,
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
