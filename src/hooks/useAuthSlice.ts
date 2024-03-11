import { useAppSelector } from '../rtk/hooks.ts';
import { selectAuth, setAuth } from '../rtk/slices/authSlice.ts';

const useAuthSlice = () => {
  const auth = useAppSelector(selectAuth);

  return {
    auth,
    setAuth,
  };
};

export default useAuthSlice;
