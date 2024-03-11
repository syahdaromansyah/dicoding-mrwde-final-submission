import { useAppSelector } from '../rtk/hooks.ts';
import { selectAlert, setAlert } from '../rtk/slices/alertSlice.ts';

const useAlertSlice = () => {
  const alert = useAppSelector(selectAlert);

  return {
    alert,
    setAlert,
  };
};

export default useAlertSlice;
