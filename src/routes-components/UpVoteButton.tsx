import type { TProfileData } from '@/types/types';
import cn from 'classnames';
import type { MouseEventHandler } from 'react';
import { MdOutlineThumbUp } from 'react-icons/md';

export default function UpVoteButton({
  profile,
  upVotesBy,
  handleUpVoteThread,
}: Readonly<{
  profile: TProfileData;
  upVotesBy: string[];
  handleUpVoteThread: MouseEventHandler<HTMLButtonElement> | undefined;
}>) {
  return (
    <p>
      <button
        className={cn(
          'flex items-center justify-center gap-x-1 rounded-md px-2 py-1 transition hover:bg-indigo-300 dark:hover:bg-indigo-600',
          {
            'dark:bg-indigo-600': upVotesBy.find(
              (upVoteBy) => upVoteBy === profile.id,
            ),
          },
          {
            'bg-indigo-300': upVotesBy.find(
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
        <span className="sr-only">Total up votes is</span> {upVotesBy.length}
      </button>
    </p>
  );
}
