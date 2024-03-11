import { getThreads } from '@/network-data/network-data';
import { useQuery } from '@tanstack/react-query';

const useThreads = () => {
  return useQuery({
    queryKey: ['threads'],
    queryFn: async () => {
      const { data } = await getThreads();
      return data;
    },
  });
};

export default useThreads;
