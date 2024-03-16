import { useAppSelector } from '@/rtk/hooks';
import {
  selectFilterThreads,
  setFilterThreads,
} from '@/rtk/slices/filterThreadsSlice';

const useFilterThreadsSlice = () => {
  const { filterThreads } = useAppSelector(selectFilterThreads);

  return {
    filterThreads,
    setFilterThreads,
  };
};

export default useFilterThreadsSlice;
