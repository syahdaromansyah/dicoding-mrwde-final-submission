import { useAppDispatch, useAppSelector } from '@/rtk/hooks';
import {
  fetchThreads,
  selectThreads,
  setDownVoteThread,
  setNeutralVoteThread,
  setStatusFetch,
  setUpVoteThread,
} from '@/rtk/slices/threadsSlice';
import { useEffect, useState } from 'react';

const useThreadsSlice = () => {
  const [fetchOnce, setFetchOnce] = useState(false);

  const dispatch = useAppDispatch();

  const { threads, status } = useAppSelector(selectThreads);

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
      dispatch(fetchThreads());
    }
  }, [dispatch, status]);

  return {
    threads: threads.data.threads,
    statusThreads: status,
    setUpVoteThread,
    setDownVoteThread,
    setNeutralVoteThread,
  };
};

export default useThreadsSlice;
