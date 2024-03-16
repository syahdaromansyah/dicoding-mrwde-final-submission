import useProfileSlice from '@/hooks/useProfileSlice';
import type { TThreadData } from '@/types/types';
import cn from 'classnames';
import { MdOutlineThumbUp } from 'react-icons/md';

export default function UpVoteButton({
  dataThread,
  handleUpVoteThread,
}: Readonly<{
  dataThread: TThreadData;
  handleUpVoteThread: () => Promise<void>;
}>) {
  const { profile } = useProfileSlice();

  return (
    <p>
      <button
        className={cn(
          'flex items-center justify-center gap-x-1 rounded-md px-2 py-1 transition hover:bg-indigo-300 dark:hover:bg-indigo-600',
          {
            'dark:bg-indigo-600': dataThread.upVotesBy.find(
              (upVoteBy) => upVoteBy === profile.id,
            ),
          },
          {
            'bg-indigo-300': dataThread.upVotesBy.find(
              (upVoteBy) => upVoteBy === profile.id,
            ),
          },
        )}
        type="button"
        onClick={handleUpVoteThread}
      >
        <span className="inline-block text-xl">
          <MdOutlineThumbUp />
        </span>
        {dataThread.upVotesBy.length}
      </button>
    </p>
  );
}
