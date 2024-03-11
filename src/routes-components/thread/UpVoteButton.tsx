import useAuthSlice from '@/hooks/useAuthSlice';
import type { TThreadResponse } from '@/types/types';
import cn from 'classnames';
import { MdOutlineThumbUp } from 'react-icons/md';

export default function UpVoteButton({
  dataThread,
  handleUpVoteThread,
}: Readonly<{
  dataThread: TThreadResponse;
  handleUpVoteThread: () => Promise<void>;
}>) {
  const { auth } = useAuthSlice();

  return (
    <p>
      <button
        className={cn(
          'flex items-center justify-center gap-x-1 rounded-md px-2 py-1 transition hover:bg-gray-200 dark:hover:bg-gray-600',
          {
            'dark:bg-gray-600': dataThread.data.detailThread.upVotesBy.find(
              (upVoteBy) => upVoteBy === auth.id,
            ),
          },
          {
            'bg-gray-200': dataThread.data.detailThread.upVotesBy.find(
              (upVoteBy) => upVoteBy === auth.id,
            ),
          },
        )}
        type="button"
        onClick={handleUpVoteThread}
      >
        <span className="inline-block text-xl">
          <MdOutlineThumbUp />
        </span>
        {dataThread.data.detailThread.upVotesBy.length}
      </button>
    </p>
  );
}
