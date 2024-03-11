import { getProfile } from '@/network-data/network-data';
import { useQuery } from '@tanstack/react-query';

const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data } = await getProfile();
      return data;
    },
  });
};

export default useProfile;
