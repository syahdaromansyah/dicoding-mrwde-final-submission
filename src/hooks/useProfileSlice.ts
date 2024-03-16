import { useAppDispatch, useAppSelector } from '@/rtk/hooks';
import {
  fetchProfile,
  selectProfile,
  setProfile,
  setStatusFetch,
} from '@/rtk/slices/profileSlice';
import { useEffect, useState } from 'react';

const useProfileSlice = () => {
  const [fetchOnce, setFetchOnce] = useState(false);

  const dispatch = useAppDispatch();

  const { profile, status } = useAppSelector(selectProfile);

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
    profile: profile.data.user,
    statusProfile: status,
    setProfile,
  };
};

export default useProfileSlice;
