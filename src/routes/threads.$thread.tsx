import LoadingProgress from '@/components/LoadingProgress';
import MarkdownEditor from '@/components/MarkdownEditor';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import useComment from '@/hooks/routes/thread/useComment';
import useAlertSlice from '@/hooks/useAlertSlice';
import useProfileSlice from '@/hooks/useProfileSlice';
import useThreadSlice from '@/hooks/useThreadSlice';
import useUsersSlice from '@/hooks/useUsersSlice';
import {
  createComment,
  downVoteComment,
  downVoteThread,
  neutralVoteComment,
  neutralVoteThread,
  upVoteComment,
  upVoteThread,
} from '@/network-data/network-data';
import DownVoteButton from '@/routes-components/DownVoteButton';
import ThreadsCategories from '@/routes-components/ThreadsCategories';
import UpVoteButton from '@/routes-components/UpVoteButton';
import Avatar from '@/routes-components/thread/Avatar';
import Comment from '@/routes-components/thread/Comment';
import CreatedAtContent from '@/routes-components/thread/CreatedAtContent';
import { useAppDispatch } from '@/rtk/hooks';
import type { TCreateCommentResponse, TErrorResponse } from '@/types/types';
import { Link, createFileRoute } from '@tanstack/react-router';
import type { ContextStore } from '@uiw/react-md-editor';
import { AxiosError } from 'axios';
import { type ChangeEvent } from 'react';
import { FaRegComment } from 'react-icons/fa';
import isEmpty from 'validator/lib/isEmpty';
import MarkdownContent from '../components/MarkdownContent';

// eslint-disable-next-line import/prefer-default-export
export const Route = createFileRoute('/threads/$thread')({
  component: Thread,
});

function Thread() {
  const { thread: threadId } = Route.useParams();

  const dispatch = useAppDispatch();

  const { comment, changeComment } = useComment();

  const { profile } = useProfileSlice();
  const { setAlert } = useAlertSlice();

  const {
    thread,
    statusThread,
    setUpVoteThread,
    setDownVoteThread,
    setNeutralVoteThread,
    setUpVoteComment,
    setDownVoteComment,
    setNeutralVoteComment,
    setComment,
  } = useThreadSlice(threadId);
  const { users } = useUsersSlice();

  const handleUpVoteThread = async () => {
    try {
      if (profile.id === '') {
        dispatch(
          setAlert({
            isShown: true,
            message: 'Please login before up voting the thread',
          }),
        );

        return;
      }

      if (thread.id === '') return;

      const alreadyVoted = thread.upVotesBy.find(
        (upVoteBy) => upVoteBy === profile.id,
      );

      if (alreadyVoted) {
        await neutralVoteThread(threadId);

        dispatch(
          setNeutralVoteThread({
            profileId: profile.id,
          }),
        );
      } else {
        await upVoteThread(threadId);

        dispatch(
          setUpVoteThread({
            profileId: profile.id,
          }),
        );
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

  const handleDownVoteThread = async () => {
    try {
      if (profile.id === '') {
        dispatch(
          setAlert({
            isShown: true,
            message: 'Please login before down voting the thread',
          }),
        );

        return;
      }

      if (thread.id === '') return;

      const alreadyVoted = thread.downVotesBy.find(
        (downVoteBy) => downVoteBy === profile.id,
      );

      if (alreadyVoted) {
        await neutralVoteThread(threadId);

        dispatch(
          setNeutralVoteThread({
            profileId: profile.id,
          }),
        );
      } else {
        await downVoteThread(threadId);

        dispatch(
          setDownVoteThread({
            profileId: profile.id,
          }),
        );
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

  const handleUpVoteComment = (commentId: string) => async () => {
    try {
      if (profile.id === '') {
        dispatch(
          setAlert({
            isShown: true,
            message: 'Please login before up voting a comment',
          }),
        );

        return;
      }

      if (thread.id === '') return;

      const foundComment = thread.comments.find(
        (threadCommment) => threadCommment.id === commentId,
      );

      if (foundComment) {
        const isNeutralComment = foundComment.upVotesBy.find(
          (upVoteBy) => upVoteBy === profile.id,
        );

        if (isNeutralComment) {
          await neutralVoteComment(threadId, commentId);

          dispatch(
            setNeutralVoteComment({
              profileId: profile.id,
              commentId: foundComment.id,
            }),
          );
        } else {
          await upVoteComment(threadId, commentId);

          dispatch(
            setUpVoteComment({
              profileId: profile.id,
              commentId: foundComment.id,
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

  const handleDownVoteComment = (commentId: string) => async () => {
    try {
      if (profile.id === '') {
        dispatch(
          setAlert({
            isShown: true,
            message: 'Please login before down voting a comment',
          }),
        );

        return;
      }

      if (thread.id === '') return;

      const foundComment = thread.comments.find(
        (threadComment) => threadComment.id === commentId,
      );

      if (foundComment) {
        const isNeutralComment = foundComment.downVotesBy.find(
          (upVoteBy) => upVoteBy === profile.id,
        );

        if (isNeutralComment) {
          await neutralVoteComment(threadId, commentId);

          dispatch(
            setNeutralVoteComment({
              profileId: profile.id,
              commentId: foundComment.id,
            }),
          );
        } else {
          await downVoteComment(threadId, commentId);

          dispatch(
            setDownVoteComment({
              profileId: profile.id,
              commentId: foundComment.id,
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

  const handleComment:
    | ((
        value?: string | undefined,
        event?: ChangeEvent<HTMLTextAreaElement> | undefined,
        state?: ContextStore | undefined,
      ) => void)
    | undefined = (inputValue) => {
    changeComment(inputValue as string);
  };

  // eslint-disable-next-line no-shadow
  const handleSendComment = (threadId: string) => async () => {
    try {
      const commentIsNotValid = isEmpty(comment);

      if (commentIsNotValid) {
        dispatch(
          setAlert({
            isShown: true,
            message: 'Error: Comment input is empty',
          }),
        );

        return;
      }

      const responseCreateComment = await createComment(threadId, comment);

      const { id, content, createdAt, owner, upVotesBy, downVotesBy } = (
        responseCreateComment.data as TCreateCommentResponse
      ).data.comment;

      dispatch(
        setComment({
          id,
          content,
          createdAt,
          owner: {
            id: owner.id,
            name: owner.name,
            avatar: profile.avatar,
          },
          upVotesBy,
          downVotesBy,
        }),
      );

      changeComment('');
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
    <div>
      <LoadingProgress
        isLoading={statusThread === 'loading'}
        isSuccess={statusThread === 'succeeded'}
        isError={statusThread === 'failed'}
      />

      {statusThread === 'succeeded' && thread.id !== '' ? (
        <article>
          <div className="mb-4">
            <ThreadsCategories>
              {thread.category.split(' ').join('').toLowerCase()}
            </ThreadsCategories>
          </div>

          <h2 className="mb-4 font-space-grotesk text-3xl font-bold md:text-4xl">
            <span className="inline-block rounded-md bg-gray-300 px-3 py-2 dark:bg-gray-800">
              {thread.title}
            </span>
          </h2>

          <div className="mb-4 break-all">
            <MarkdownContent>{thread.body}</MarkdownContent>
          </div>

          <div className="lg: mb-4 flex flex-wrap items-center gap-4 border-b-2 border-gray-200 pb-4 dark:border-gray-800">
            <UpVoteButton
              profile={profile}
              upVotesBy={thread.upVotesBy}
              handleUpVoteThread={handleUpVoteThread}
            />

            <DownVoteButton
              profile={profile}
              downVotesBy={thread.downVotesBy}
              handleDownVoteThread={handleDownVoteThread}
            />

            <p className="flex items-center justify-center gap-x-1">
              <span>
                <span className="inline-block text-xl">
                  <FaRegComment />
                </span>
              </span>
              {thread.comments.length}
            </p>

            <CreatedAtContent createdAt={thread.createdAt} />

            <p>Created by</p>

            {users && <Avatar dataThread={thread} dataUsers={users} />}
          </div>

          <h3 className="mb-4 font-space-grotesk text-xl font-bold md:text-4xl">
            Give a Comment
          </h3>

          {profile.id ? (
            <div className="mb-4 grid gap-y-4">
              <div className="h-64">
                <MarkdownEditor value={comment} handleValue={handleComment} />
              </div>

              <div>
                <p>
                  <Button
                    className="inline-block w-full"
                    type="button"
                    onClick={handleSendComment(thread.id)}
                  >
                    Send Comment
                  </Button>
                </p>
              </div>
            </div>
          ) : null}

          <div className="mb-4">
            {profile.id ? null : (
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
            Commentary ({thread.comments.length})
          </h3>

          {thread.comments.length > 0 && users.length > 0 && (
            <section className="grid gap-y-4">
              {thread.comments.map((threadComment) => (
                <Comment
                  key={threadComment.id}
                  profile={profile}
                  comment={threadComment}
                  dataUsers={users}
                  handleUpVoteComment={handleUpVoteComment(threadComment.id)}
                  handleDownVoteComment={handleDownVoteComment(
                    threadComment.id,
                  )}
                />
              ))}
            </section>
          )}

          {thread.comments.length === 0 && <p>There is no commentary yet.</p>}
        </article>
      ) : (
        <div>
          <div className="mb-4">
            <Skeleton className="h-8 w-[25%]" />
          </div>

          <div className="mb-4">
            <Skeleton className="h-12 w-[50%]" />
          </div>

          <div className="mb-4 grid gap-y-2">
            <Skeleton className="h-7 w-[98%]" />
            <Skeleton className="h-7 w-[98%]" />
            <Skeleton className="h-7 w-[94%]" />
          </div>

          <div className="mb-4 flex flex-wrap gap-4 border-b-2 border-gray-200 pb-4 dark:border-gray-800">
            <Skeleton className="h-8 w-12" />
            <Skeleton className="h-8 w-12" />
            <Skeleton className="h-8 w-28" />
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-24" />
          </div>

          {profile.id === '' ? (
            <div className="mb-4">
              <Skeleton className="h-10 w-[45%]" />
            </div>
          ) : null}

          {profile.id ? (
            <div className="mb-4 grid gap-y-4">
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : null}

          <div className="mb-4">
            <Skeleton className="h-8 w-[25%]" />
          </div>

          <div className="rounded-md p-4 dark:bg-gray-950">
            <div className="flex justify-between">
              <div className="mb-4 flex gap-x-2">
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-7 w-28" />
              </div>

              <Skeleton className="h-7 w-28" />
            </div>

            <div className="mb-4">
              <Skeleton className="h-7 w-[65%]" />
            </div>

            <div className="flex flex-wrap gap-4">
              <Skeleton className="h-8 w-12" />
              <Skeleton className="h-8 w-12" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
