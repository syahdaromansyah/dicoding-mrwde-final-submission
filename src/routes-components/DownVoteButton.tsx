import type { TProfileData } from '@/types/types';
import cn from 'classnames';
import type { MouseEventHandler } from 'react';
import { MdOutlineThumbDown } from 'react-icons/md';

export default function DownVoteButton({
  profile,
  downVotesBy,
  handleDownVoteThread,
}: Readonly<{
  profile: TProfileData;
  downVotesBy: string[];
  handleDownVoteThread: MouseEventHandler<HTMLButtonElement> | undefined;
}>) {
  return (
    <p>
      <button
        className={cn(
          'flex items-center justify-center gap-x-1 rounded-md px-2 py-1 transition hover:bg-gray-200 dark:hover:bg-gray-600',
          {
            'dark:bg-gray-600': downVotesBy.find(
              (downVoteBy) => downVoteBy === profile.id,
            ),
          },
          {
            'bg-gray-200': downVotesBy.find(
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
        <span className="sr-only">Total down votes is</span>{' '}
        {downVotesBy.length}
      </button>
    </p>
  );
}
