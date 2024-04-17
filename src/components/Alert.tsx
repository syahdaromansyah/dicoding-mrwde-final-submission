import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import useAlertSlice from '@/hooks/useAlertSlice';
import { useAppDispatch } from '@/rtk/hooks';
import { AlertOctagon, X } from 'lucide-react';
import { Button } from './ui/button';

export default function AlertBox() {
  const { alert, setAlert } = useAlertSlice();

  const dispatch = useAppDispatch();

  const handleCloseAlert = () =>
    dispatch(
      setAlert({
        isShown: false,
        message: '',
      }),
    );

  return (
    <Alert className="w-full min-w-[342px]">
      <AlertOctagon className="h-4 w-4" />
      <div className="flex items-center justify-between gap-x-4">
        <div>
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            <p>{alert.message}</p>
          </AlertDescription>
        </div>

        <div>
          <Button
            type="button"
            onClick={handleCloseAlert}
            data-cy="alert-close-btn"
          >
            <X />
            <span className="sr-only">Close alert</span>
          </Button>
        </div>
      </div>
    </Alert>
  );
}
