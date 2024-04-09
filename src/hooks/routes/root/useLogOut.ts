import { useToast } from '@/components/ui/use-toast';
import useProfileSlice from '@/hooks/useProfileSlice';
import { removeAccessToken } from '@/network-data/network-data';
import { useAppDispatch } from '@/rtk/hooks';
import { useNavigate } from '@tanstack/react-router';

const useLogOut = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { setProfile } = useProfileSlice();
  const { toast } = useToast();

  const logOut = () => {
    removeAccessToken();

    dispatch(
      setProfile({
        profile: {
          message: '',
          status: '',
          data: {
            user: {
              id: '',
              name: '',
              email: '',
              avatar: '',
            },
          },
        },
        status: 'idle',
        error: null,
      }),
    );

    toast({
      title: 'Log Out Account',
      description: 'Log out account is success',
    });

    navigate({ to: '/login' });
  };

  return {
    handleLogOut: logOut,
  };
};

export default useLogOut;
