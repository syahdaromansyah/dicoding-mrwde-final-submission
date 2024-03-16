import { useAppDispatch, useAppSelector } from '@/rtk/hooks';
import {
  fetchLeaderBoards,
  selectLeaderBoards,
  setStatusFetch,
} from '@/rtk/slices/leaderBoardsSlice';
import { useEffect, useState } from 'react';

const useLeaderBoardsSlice = () => {
  const [fetchOnce, setFetchOnce] = useState(false);

  const dispatch = useAppDispatch();

  const { leaderBoards, status } = useAppSelector(selectLeaderBoards);

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
      dispatch(fetchLeaderBoards());
    }
  }, [dispatch, status]);

  return {
    leaderBoards: leaderBoards.data.leaderboards,
    statusLeaderBoards: status,
  };
};

export default useLeaderBoardsSlice;
