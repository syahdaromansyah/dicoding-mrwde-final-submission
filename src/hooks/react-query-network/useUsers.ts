import { getUsers } from '@/network-data/network-data';
import { useQuery } from '@tanstack/react-query';

const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await getUsers();
      return data;
    },
  });
};

export default useUsers;
