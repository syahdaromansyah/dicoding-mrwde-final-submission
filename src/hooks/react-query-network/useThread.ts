import { getThread } from '@/network-data/network-data';
import { useQuery } from '@tanstack/react-query';

const useThread = (threadId: string) => {
  return useQuery({
    queryKey: ['thread', threadId],
    queryFn: async () => {
      const { data } = await getThread(threadId);
      return data;
    },
  });
};

export default useThread;
