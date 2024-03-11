import useAuthSlice from '@/hooks/useAuthSlice';
import { useAppDispatch } from '@/rtk/hooks';
import type { TProfileResponse } from '@/types/types';
import { useEffect } from 'react';

const useSetProfile = ({
  dataProfile,
}: Readonly<{
  dataProfile: TProfileResponse | undefined;
}>) => {
  const dispatch = useAppDispatch();
  const { setAuth } = useAuthSlice();

  useEffect(() => {
    if (dataProfile) {
      const { id, name, email, avatar } = dataProfile.data.user;

      dispatch(
        setAuth({
          id,
          name,
          email,
          avatar,
        }),
      );
    }
  }, [dataProfile, dispatch, setAuth]);
};

export default useSetProfile;
