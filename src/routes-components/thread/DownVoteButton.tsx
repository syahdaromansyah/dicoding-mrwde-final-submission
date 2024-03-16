import useProfileSlice from '@/hooks/useProfileSlice';
import type { TThreadData } from '@/types/types';
import cn from 'classnames';
import { MdOutlineThumbDown } from 'react-icons/md';

export default function DownVoteButton({
  dataThread,
  handleDownVoteThread,
}: Readonly<{
  dataThread: TThreadData;
  handleDownVoteThread: () => Promise<void>;
}>) {
  const { profile } = useProfileSlice();

  return (
    <p>
      <button
        className={cn(
          'flex items-center justify-center gap-x-1 rounded-md px-2 py-1 transition hover:bg-gray-200 dark:hover:bg-gray-600',
          {
            'dark:bg-gray-600': dataThread.downVotesBy.find(
              (downVoteBy) => downVoteBy === profile.id,
            ),
          },
          {
            'bg-gray-200': dataThread.downVotesBy.find(
              (downVoteBy) => downVoteBy === profile.id,
            ),
          },
        )}
        type="button"
        onClick={handleDownVoteThread}
      >
        <span className="inline-block text-xl">
          <MdOutlineThumbDown />
        </span>
        {dataThread.downVotesBy.length}
      </button>
    </p>
  );
}
