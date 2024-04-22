import { useAppDispatch } from '@/rtk/hooks';
import { fetchProfile } from '@/rtk/slices/profileSlice';
import { useEffect, useState } from 'react';

const useFetchProfile = () => {
  const [fetchOnce, setFetchOnce] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (fetchOnce === false) {
      dispatch(fetchProfile());
      setFetchOnce(() => true);
    }
  }, [dispatch, fetchOnce]);

  return {
    isDone: fetchOnce,
  };
};

export default useFetchProfile;
