import { useAppDispatch, useAppSelector } from '@/rtk/hooks';
import {
  fetchUsers,
  selectUsers,
  setStatusFetch,
} from '@/rtk/slices/usersSlice';
import { useEffect, useState } from 'react';

const useUsersSlice = () => {
  const [fetchOnce, setFetchOnce] = useState(false);

  const dispatch = useAppDispatch();

  const { users, status } = useAppSelector(selectUsers);

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
      dispatch(fetchUsers());
    }
  }, [dispatch, status]);

  return {
    users: users.data.users,
    statusUsers: status,
  };
};

export default useUsersSlice;
