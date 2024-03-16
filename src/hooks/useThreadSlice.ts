import { useAppDispatch, useAppSelector } from '@/rtk/hooks';
import {
  fetchThread,
  selectThread,
  setComment,
  setDownVoteComment,
  setDownVoteThread,
  setNeutralVoteComment,
  setNeutralVoteThread,
  setStatusFetch,
  setUpVoteComment,
  setUpVoteThread,
} from '@/rtk/slices/threadSlice';
import { useEffect, useState } from 'react';

const useThreadSlice = (threadId: string) => {
  const [fetchOnce, setFetchOnce] = useState(false);

  const dispatch = useAppDispatch();

  const { thread, status } = useAppSelector(selectThread);

  useEffect(() => {
    if (fetchOnce === false) {
      setFetchOnce(() => true);

      dispatch(
        setStatusFetch({
          status: 'idle',
        }),
      );
    }
  }, [dispatch, fetchOnce]);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchThread(threadId));
    }
  }, [dispatch, status, threadId]);

  return {
    thread: thread.data.detailThread,
    statusThread: status,
    setUpVoteThread,
    setDownVoteThread,
    setNeutralVoteThread,
    setUpVoteComment,
    setDownVoteComment,
    setNeutralVoteComment,
    setComment,
  };
};

export default useThreadSlice;
