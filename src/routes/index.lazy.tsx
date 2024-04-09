import LoadingProgress from '@/components/LoadingProgress';
import { Input } from '@/components/ui/input';
import useAlertSlice from '@/hooks/useAlertSlice';
import useFilterThreadsSlice from '@/hooks/useFilterThreadsSlice';
import useProfileSlice from '@/hooks/useProfileSlice';
import useThreadsSlice from '@/hooks/useThreadsSlice';
import useUsersSlice from '@/hooks/useUsersSlice';
import {
  downVoteThread,
  neutralVoteThread,
  upVoteThread,
} from '@/network-data/network-data';
import DownVoteButton from '@/routes-components/DownVoteButton';
import ThreadsCategories from '@/routes-components/ThreadsCategories';
import UpVoteButton from '@/routes-components/UpVoteButton';
import CategorySkeleton from '@/routes-components/threads/CategorySkeleton';
import ThreadNotFound from '@/routes-components/threads/ThreadNotFound';
import ThreadSkeleton from '@/routes-components/threads/ThreadSkeleton';
import { useAppDispatch } from '@/rtk/hooks';
import type { TErrorResponse } from '@/types/types';
import { Link, createLazyFileRoute } from '@tanstack/react-router';
import { AxiosError } from 'axios';
import { formatDistance } from 'date-fns';
import { motion } from 'framer-motion';
import { type ChangeEventHandler } from 'react';
import { FaRegComment } from 'react-icons/fa';
import MarkdownContent from '../components/MarkdownContent';

// eslint-disable-next-line import/prefer-default-export
export const Route = createLazyFileRoute('/')({
  component: Index,
});

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.6,
      type: 'spring',
      stiffness: 250,
    },
  },
};

function Index() {
  const dispatch = useAppDispatch();

  const { profile } = useProfileSlice();
  const { setAlert } = useAlertSlice();
  const { filterThreads, setFilterThreads } = useFilterThreadsSlice();

  const {
    threads,
    statusThreads,
    setUpVoteThread,
    setDownVoteThread,
    setNeutralVoteThread,
  } = useThreadsSlice();

  const { users, statusUsers } = useUsersSlice();

  const filteredThreads = threads.filter((thread) =>
    thread.title
      .toLowerCase()
      .split(' ')
      .join('')
      .startsWith(filterThreads.toLowerCase().split(' ').join('')),
  );

  const unDuplicateCategory = new Set(
    threads?.map((thread) => thread.category),
  );

  const handleFilterThreads: ChangeEventHandler<HTMLInputElement> = (ev) =>
    dispatch(
      setFilterThreads({
        filterThreads: ev.target.value,
      }),
    );

  const handleUpVoteThread = (threadId: string) => async () => {
    try {
      if (profile.id === '') {
        dispatch(
          setAlert({
            isShown: true,
            message: 'Please login before up voting a thread',
          }),
        );

        return;
      }

      if (threads.length === 0) return;

      const foundThread = threads.find((thread) => thread.id === threadId);

      if (foundThread) {
        const isNeutralVoted = foundThread.upVotesBy.find(
          (upVoteBy) => upVoteBy === profile.id,
        );

        if (isNeutralVoted) {
          await neutralVoteThread(threadId);

          dispatch(
            setNeutralVoteThread({
              threadId,
              profileId: profile.id,
            }),
          );
        } else {
          await upVoteThread(threadId);

          dispatch(
            setUpVoteThread({
              threadId,
              profileId: profile.id,
            }),
          );
        }
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          const { message } = error.response.data as TErrorResponse;

          dispatch(
            setAlert({
              isShown: true,
              message: `Error: ${message}`,
            }),
          );
        }
      }
    }
  };

  const handleDownVoteThread = (threadId: string) => async () => {
    try {
      if (profile.id === '') {
        dispatch(
          setAlert({
            isShown: true,
            message: 'Please login before down voting a thread',
          }),
        );

        return;
      }

      if (threads.length === 0) return;

      const foundThread = threads.find((thread) => thread.id === threadId);

      if (foundThread) {
        const isNeutralVoted = foundThread.downVotesBy.find(
          (downVoteBy) => downVoteBy === profile.id,
        );

        if (isNeutralVoted) {
          await neutralVoteThread(threadId);

          dispatch(
            setNeutralVoteThread({
              threadId,
              profileId: profile.id,
            }),
          );
        } else {
          await downVoteThread(threadId);

          dispatch(
            setDownVoteThread({
              threadId,
              profileId: profile.id,
            }),
          );
        }
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          const { message } = error.response.data as TErrorResponse;

          dispatch(
            setAlert({
              isShown: true,
              message: `Error: ${message}`,
            }),
          );
        }
      }
    }
  };

  return (
    <>
      <LoadingProgress
        isLoading={statusThreads === 'loading'}
        isSuccess={statusThreads === 'succeeded'}
        isError={statusThreads === 'failed'}
      />

      <div>
        <h2 className="mb-4 font-space-grotesk text-xl font-bold md:text-2xl">
          Kategori popular
        </h2>

        <div className="mb-4 flex flex-wrap gap-2 border-b-2 border-gray-200 pb-4 dark:border-gray-800">
          {statusThreads === 'succeeded' ? (
            [...unDuplicateCategory].map((category) => (
              <p
                key={category}
                className="inline-block rounded-md border border-gray-300 px-2 py-1 dark:border-gray-600"
              >
                #{category.split(' ').join('')}
              </p>
            ))
          ) : (
            <CategorySkeleton />
          )}
        </div>
      </div>

      <div>
        <h2 className="mb-4 font-space-grotesk text-3xl font-bold">
          Diskusi tersedia
        </h2>

        <div className="mb-4">
          <p>
            <Input
              className="inline-block md:min-w-96"
              type="text"
              placeholder="Filter Threads"
              value={filterThreads}
              onChange={handleFilterThreads}
            />
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-3 gap-y-4 md:grid-cols-[repeat(auto-fill,minmax(540px,1fr))]"
        >
          {statusThreads === 'succeeded' ||
          statusUsers === 'succeeded' ||
          filteredThreads.length !== 0 ? (
            <>
              {filteredThreads.length > 0 &&
                filteredThreads.map((thread) => (
                  <motion.article
                    initial={{ opacity: 0, scale: 0, rotate: 15 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: false }}
                    className="rounded-md border border-gray-300 p-2 dark:border-gray-600"
                    key={thread.id}
                  >
                    <div className="mb-2">
                      <ThreadsCategories>
                        {thread.category.split(' ').join('')}
                      </ThreadsCategories>
                    </div>

                    <h2 className="mb-2">
                      <Link
                        className="font-space-grotesk text-xl font-bold underline md:text-3xl"
                        to="/threads/$thread"
                        params={{
                          thread: thread.id,
                        }}
                      >
                        {thread.title}
                      </Link>
                    </h2>

                    <div className="mb-2 text-ellipsis text-wrap break-all">
                      <MarkdownContent>
                        {`${thread.body.trim().split(' ').slice(0, 33).join(' ')}...`}
                      </MarkdownContent>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 ">
                      <UpVoteButton
                        profile={profile}
                        upVotesBy={thread.upVotesBy}
                        handleUpVoteThread={handleUpVoteThread(thread.id)}
                      />

                      <DownVoteButton
                        profile={profile}
                        downVotesBy={thread.downVotesBy}
                        handleDownVoteThread={handleDownVoteThread(thread.id)}
                      />
                      <div>
                        <p className="flex items-center justify-center gap-x-1">
                          <span>
                            <span className="inline-block text-xl">
                              <FaRegComment />
                            </span>
                          </span>
                          {thread.totalComments}
                        </p>
                      </div>
                      <div className="flex-1">
                        <time
                          dateTime={formatDistance(
                            thread.createdAt,
                            new Date(),
                            {
                              addSuffix: true,
                            },
                          )}
                        >
                          {formatDistance(thread.createdAt, new Date(), {
                            addSuffix: true,
                          })}
                        </time>
                      </div>
                      <div className="flex-1">
                        <p>
                          Created by{' '}
                          {statusUsers === 'succeeded' && users.length !== 0
                            ? users.find((user) => user.id === thread.ownerId)
                                ?.name
                            : null}
                        </p>
                      </div>
                    </div>
                  </motion.article>
                ))}

              {statusThreads === 'succeeded' &&
                filteredThreads.length === 0 && (
                  <ThreadNotFound filterThreads={filterThreads} />
                )}
            </>
          ) : (
            <>
              <motion.article
                initial={{ opacity: 0, scale: 0, rotate: 15 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: false }}
              >
                <ThreadSkeleton />
              </motion.article>

              <motion.article
                initial={{ opacity: 0, scale: 0, rotate: 15 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: false }}
              >
                <ThreadSkeleton />
              </motion.article>

              <motion.article
                initial={{ opacity: 0, scale: 0, rotate: 15 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: false }}
              >
                <ThreadSkeleton />
              </motion.article>

              <motion.article
                initial={{ opacity: 0, scale: 0, rotate: 15 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: false }}
              >
                <ThreadSkeleton />
              </motion.article>
            </>
          )}
        </motion.div>
      </div>
    </>
  );
}
