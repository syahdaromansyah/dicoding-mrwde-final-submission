import { useAppDispatch, useAppSelector } from '@/rtk/hooks';
import {
  fetchProfile,
  selectProfile,
  setStatusFetch,
} from '@/rtk/slices/profileSlice';
import { useEffect, useState } from 'react';

const useFetchProfile = () => {
  const [fetchOnce, setFetchOnce] = useState(false);

  const dispatch = useAppDispatch();

  const { status } = useAppSelector(selectProfile);

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
      dispatch(fetchProfile());
    }
  }, [dispatch, status]);

  return {
    isDone: fetchOnce,
  };
};

export default useFetchProfile;
