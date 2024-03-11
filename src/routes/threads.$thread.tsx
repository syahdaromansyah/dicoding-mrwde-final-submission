import MarkdownEditor from '@/components/MarkdownEditor';
import { Button } from '@/components/ui/button';
import useThread from '@/hooks/react-query-network/useThread';
import useThreads from '@/hooks/react-query-network/useThreads';
import useUsers from '@/hooks/react-query-network/useUsers';
import useComment from '@/hooks/routes/thread/useComment';
import useAlertSlice from '@/hooks/useAlertSlice';
import {
  createComment,
  downVoteComment,
  downVoteThread,
  neutralVoteComment,
  neutralVoteThread,
  upVoteComment,
  upVoteThread,
} from '@/network-data/network-data';
import ThreadCategory from '@/routes-components/ThreadCategory';
import Avatar from '@/routes-components/thread/Avatar';
import Comment from '@/routes-components/thread/Comment';
import CreatedAtContent from '@/routes-components/thread/CreatedAtContent';
import DownVoteButton from '@/routes-components/thread/DownVoteButton';
import UpVoteButton from '@/routes-components/thread/UpVoteButton';
import { useAppDispatch } from '@/rtk/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { Link, createFileRoute } from '@tanstack/react-router';
import type { ContextStore } from '@uiw/react-md-editor';
import type { ChangeEvent } from 'react';
import { FaRegComment } from 'react-icons/fa';
import isEmpty from 'validator/lib/isEmpty';
import MarkdownContent from '../components/MarkdownContent';
import useAuthSlice from '../hooks/useAuthSlice';

export const Route = createFileRoute('/threads/$thread')({
  component: Thread,
});

function Thread() {
  const queryClient = useQueryClient();

  const { thread: threadId } = Route.useParams();

  const { comment, changeComment } = useComment();

  const dispatch = useAppDispatch();

  const { data: dataThread } = useThread(threadId);
  const { data: dataThreads } = useThreads();
  const { data: dataUsers } = useUsers();

  const { auth } = useAuthSlice();
  const { setAlert } = useAlertSlice();

  const handleUpVoteThread = async () => {
    if (auth.id === '') {
      dispatch(
        setAlert({
          isShown: true,
          message: 'Please login before up voting the thread',
        }),
      );

      return;
    }
    if (!dataThread) return;

    const alreadyVoted = dataThread.data.detailThread.upVotesBy.find(
      (upVoteBy) => upVoteBy === auth.id,
    );

    if (alreadyVoted) {
      await neutralVoteThread(threadId);
    } else {
      await upVoteThread(threadId);
    }

    queryClient.invalidateQueries({
      queryKey: ['thread', threadId],
    });
  };

  const handleDownVoteThread = async () => {
    if (auth.id === '') {
      dispatch(
        setAlert({
          isShown: true,
          message: 'Please login before down voting a thread',
        }),
      );

      return;
    }
    if (!dataThread) return;

    const alreadyVoted = dataThread.data.detailThread.downVotesBy.find(
      (downVoteBy) => downVoteBy === auth.id,
    );

    if (alreadyVoted) {
      await neutralVoteThread(threadId);
    } else {
      await downVoteThread(threadId);
    }

    queryClient.invalidateQueries({
      queryKey: ['thread', threadId],
    });
  };

  const handleUpVoteComment = (commentId: string) => {
    return async () => {
      if (auth.id === '') {
        dispatch(
          setAlert({
            isShown: true,
            message: 'Please login before up voting a comment',
          }),
        );

        return;
      }
      if (!dataThread) return;

      const foundComment = dataThread.data.detailThread.comments.find(
        (comment) => comment.id === commentId,
      );

      if (foundComment) {
        const isNeutralComment = foundComment.upVotesBy.find(
          (upVoteBy) => upVoteBy === auth.id,
        );

        if (isNeutralComment) {
          await neutralVoteComment(threadId, commentId);
        } else {
          await upVoteComment(threadId, commentId);
        }
      }

      queryClient.invalidateQueries({
        queryKey: ['thread', threadId],
      });
    };
  };

  const handleDownVoteComment = (commentId: string) => {
    return async () => {
      if (auth.id === '') {
        dispatch(
          setAlert({
            isShown: true,
            message: 'Please login before down voting a comment',
          }),
        );

        return;
      }
      if (!dataThread) return;

      const foundComment = dataThread.data.detailThread.comments.find(
        (comment) => comment.id === commentId,
      );

      if (foundComment) {
        const isNeutralComment = foundComment.downVotesBy.find(
          (upVoteBy) => upVoteBy === auth.id,
        );

        if (isNeutralComment) {
          await neutralVoteComment(threadId, commentId);
        } else {
          await downVoteComment(dataThread.data.detailThread.id, commentId);
        }
      }

      queryClient.invalidateQueries({
        queryKey: ['thread', threadId],
      });
    };
  };

  const handleComment:
    | ((
        value?: string | undefined,
        event?: ChangeEvent<HTMLTextAreaElement> | undefined,
        state?: ContextStore | undefined,
      ) => void)
    | undefined = (inputValue) => {
    changeComment(inputValue as string);
  };

  const handleSendComment = (threadId: string) => {
    return async () => {
      const commentIsNotValid = isEmpty(comment);

      if (commentIsNotValid) {
        dispatch(
          setAlert({
            isShown: true,
            message: 'Comment input is empty',
          }),
        );

        return;
      }

      await createComment(threadId, comment);

      changeComment('');

      queryClient.invalidateQueries({
        queryKey: ['thread', threadId],
      });
    };
  };

  return (
    <div>
      {dataThread ? (
        <article>
          <div className="mb-4">
            <ThreadCategory>
              {dataThread.data.detailThread.category}
            </ThreadCategory>
          </div>

          <h2 className="mb-4 font-space-grotesk text-3xl font-bold md:text-4xl">
            <span className="inline-block rounded-md px-2 py-1 dark:bg-gray-800">
              {dataThread.data.detailThread.title}
            </span>
          </h2>

          <div className="mb-4 break-all">
            <MarkdownContent>
              {dataThread.data.detailThread.body}
            </MarkdownContent>
          </div>

          <div className="lg: mb-4 flex flex-wrap items-center gap-4 border-b-2 border-gray-200 pb-4 dark:border-gray-800">
            <UpVoteButton
              dataThread={dataThread}
              handleUpVoteThread={handleUpVoteThread}
            />

            <DownVoteButton
              dataThread={dataThread}
              handleDownVoteThread={handleDownVoteThread}
            />

            <p className="flex items-center justify-center gap-x-1">
              <span>
                <span className="inline-block text-xl">
                  <FaRegComment />
                </span>
              </span>
              {dataThread.data.detailThread.comments.length}
            </p>

            <CreatedAtContent dataThread={dataThread} />

            <p>Created by</p>

            {dataThreads && dataUsers && (
              <Avatar
                dataThread={dataThread}
                dataThreads={dataThreads}
                dataUsers={dataUsers}
              />
            )}
          </div>

          <h3 className="mb-4 font-space-grotesk text-xl font-bold md:text-4xl">
            Give a Comment
          </h3>

          {auth.id ? (
            <div className="mb-4 grid gap-y-4">
              <div className="h-64">
                <MarkdownEditor value={comment} handleValue={handleComment} />
              </div>

              <div>
                <p>
                  <Button
                    className="inline-block w-full"
                    type="button"
                    onClick={handleSendComment(dataThread.data.detailThread.id)}
                  >
                    Send Comment
                  </Button>
                </p>
              </div>
            </div>
          ) : null}

          <div className="mb-4">
            {auth.id ? null : (
              <p>
                <Link
                  className="underline hover:text-gray-500 dark:hover:text-gray-300"
                  to="/login"
                >
                  Login first
                </Link>{' '}
                before commenting
              </p>
            )}
          </div>

          <h3 className="mb-4 font-space-grotesk text-xl font-bold md:text-3xl">
            Commentary ({dataThread.data.detailThread.comments.length})
          </h3>

          {dataThread.data.detailThread.comments.length > 0 && dataUsers && (
            <section className="grid gap-y-4">
              {dataThread.data.detailThread.comments.map((comment) => (
                <Comment
                  key={comment.id}
                  comment={comment}
                  dataUsers={dataUsers}
                  handleUpVoteComment={handleUpVoteComment}
                  handleDownVoteComment={handleDownVoteComment}
                />
              ))}
            </section>
          )}

          {dataThread.data.detailThread.comments.length === 0 && (
            <p>There is no commentary yet.</p>
          )}
        </article>
      ) : (
        'Loading...'
      )}
    </div>
  );
}
