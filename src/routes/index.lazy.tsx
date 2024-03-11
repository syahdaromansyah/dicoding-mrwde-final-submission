import useThreads from '@/hooks/react-query-network/useThreads';
import useUsers from '@/hooks/react-query-network/useUsers';
import useAlertSlice from '@/hooks/useAlertSlice';
import useAuthSlice from '@/hooks/useAuthSlice';
import {
  downVoteThread,
  neutralVoteThread,
  upVoteThread,
} from '@/network-data/network-data';
import ThreadCategory from '@/routes-components/ThreadCategory';
import DownVoteButton from '@/routes-components/threads/DownVoteButton';
import UpVoteButton from '@/routes-components/threads/UpVoteButton';
import { useAppDispatch } from '@/rtk/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { Link, createLazyFileRoute } from '@tanstack/react-router';
import { formatDistance } from 'date-fns';
import { motion } from 'framer-motion';
import { FaRegComment } from 'react-icons/fa';
import MarkdownContent from '../components/MarkdownContent';

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
  const queryClient = useQueryClient();

  const dispatch = useAppDispatch();

  const { setAlert } = useAlertSlice();

  const { data: dataUsers } = useUsers();
  const { data: dataThreads } = useThreads();

  const unDuplicateCategory = new Set(
    dataThreads?.data.threads.map((thread) => thread.category),
  );

  const { auth } = useAuthSlice();

  const handleUpVoteThread = (threadId: string) => {
    return async () => {
      if (auth.id === '') {
        dispatch(
          setAlert({
            isShown: true,
            message: 'Please login before up voting a thread',
          }),
        );

        return;
      }
      if (!dataThreads) return;

      const foundThread = dataThreads.data.threads.find(
        (thread) => thread.id === threadId,
      );

      if (foundThread) {
        const isNeutralVoted = foundThread.upVotesBy.find(
          (upVoteBy) => upVoteBy === auth.id,
        );

        if (isNeutralVoted) {
          await neutralVoteThread(threadId);
        } else {
          await upVoteThread(threadId);
        }
      }

      queryClient.invalidateQueries({
        queryKey: ['threads'],
      });
    };
  };

  const handleDownVoteThread = (threadId: string) => {
    return async () => {
      if (auth.id === '') {
        dispatch(
          setAlert({
            isShown: true,
            message: 'Please login before down voting a thread',
          }),
        );

        return;
      }

      if (!dataThreads) return;

      const foundThread = dataThreads.data.threads.find(
        (thread) => thread.id === threadId,
      );

      if (foundThread) {
        const isNeutralVoted = foundThread.downVotesBy.find(
          (downVoteBy) => downVoteBy === auth.id,
        );

        if (isNeutralVoted) {
          await neutralVoteThread(threadId);
        } else {
          await downVoteThread(threadId);
        }
      }

      queryClient.invalidateQueries({
        queryKey: ['threads'],
      });
    };
  };

  return (
    <>
      <div>
        <h2 className="mb-4 font-space-grotesk text-xl font-bold md:text-2xl">
          Kategori popular
        </h2>

        <div className="mb-4 flex flex-wrap gap-2 border-b-2 border-gray-200 pb-4 dark:border-gray-800">
          {dataThreads
            ? [...unDuplicateCategory].map((category) => (
                <p
                  key={category}
                  className="inline-block rounded-md border border-gray-300 px-2 py-1 dark:border-gray-600"
                >
                  #{category.split(' ').join('')}
                </p>
              ))
            : null}
        </div>
      </div>

      <div>
        <h2 className="mb-4 font-space-grotesk text-3xl font-bold">
          Diskusi tersedia
        </h2>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-3 gap-y-4 md:grid-cols-[repeat(auto-fill,minmax(540px,1fr))]"
        >
          {dataThreads
            ? dataThreads.data.threads.map((thread) => (
                <motion.article
                  initial={{ opacity: 0, scale: 0, rotate: 15 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: false }}
                  // variants={item}
                  className="rounded-md border border-gray-300 p-2 dark:border-gray-600"
                  key={thread.id}
                >
                  <div className="mb-2">
                    <ThreadCategory>
                      {thread.category.split(' ').join('')}
                    </ThreadCategory>
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
                      thread={thread}
                      handleUpVoteThread={handleUpVoteThread}
                    />

                    <DownVoteButton
                      thread={thread}
                      handleDownVoteThread={handleDownVoteThread}
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
                        dateTime={formatDistance(thread.createdAt, new Date(), {
                          addSuffix: true,
                        })}
                      >
                        {formatDistance(thread.createdAt, new Date(), {
                          addSuffix: true,
                        })}
                      </time>
                    </div>

                    <div className="flex-1">
                      <p>
                        Created by{' '}
                        {dataThreads && dataUsers
                          ? dataUsers.data.users.find(
                              (user) => user.id === thread.ownerId,
                            )?.name
                          : null}
                      </p>
                    </div>
                  </div>
                </motion.article>
              ))
            : null}
        </motion.div>
      </div>
    </>
  );
}
