import { getLeaderboards } from '@/network-data/network-data';
import { useQuery } from '@tanstack/react-query';

const useLeaderboards = () => {
  return useQuery({
    queryKey: ['leaderboards'],
    queryFn: async () => {
      const { data } = await getLeaderboards();
      return data;
    },
  });
};

export default useLeaderboards;
