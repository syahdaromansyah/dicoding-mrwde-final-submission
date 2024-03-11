import useAuthSlice from '@/hooks/useAuthSlice';
import type { TThreadResponse } from '@/types/types';
import cn from 'classnames';
import { MdOutlineThumbDown } from 'react-icons/md';

export default function DownVoteButton({
  dataThread,
  handleDownVoteThread,
}: Readonly<{
  dataThread: TThreadResponse;
  handleDownVoteThread: () => Promise<void>;
}>) {
  const { auth } = useAuthSlice();

  return (
    <p>
      <button
        className={cn(
          'flex items-center justify-center gap-x-1 rounded-md px-2 py-1 transition hover:bg-gray-200 dark:hover:bg-gray-600',
          {
            'dark:bg-gray-600': dataThread.data.detailThread.downVotesBy.find(
              (downVoteBy) => downVoteBy === auth.id,
            ),
          },
          {
            'bg-gray-200': dataThread.data.detailThread.downVotesBy.find(
              (downVoteBy) => downVoteBy === auth.id,
            ),
          },
        )}
        type="button"
        onClick={handleDownVoteThread}
      >
        <span className="inline-block text-xl">
          <MdOutlineThumbDown />
        </span>
        {dataThread.data.detailThread.downVotesBy.length}
      </button>
    </p>
  );
}
