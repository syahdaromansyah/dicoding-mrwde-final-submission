import { useAppSelector } from '@/rtk/hooks';
import {
  fetchProfile,
  selectProfile,
  setProfile,
} from '@/rtk/slices/profileSlice';

const useProfileSlice = () => {
  const { profile, status } = useAppSelector(selectProfile);

  return {
    profile: profile.data.user,
    fetchProfile,
    statusProfile: status,
    setProfile,
  };
};

export default useProfileSlice;
