import { useAppSelector } from '@/rtk/hooks';
import {
  fetchProfile,
  resetProfile,
  selectProfile,
} from '@/rtk/slices/profileSlice';

const useProfileSlice = () => {
  const { profile, status } = useAppSelector(selectProfile);

  return {
    profile: profile.data.user,
    statusProfile: status,
    fetchProfile,
    resetProfile,
  };
};

export default useProfileSlice;
