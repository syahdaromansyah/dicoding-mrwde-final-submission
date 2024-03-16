import { useEffect, useState } from 'react';

const useLoadingBar = ({
  isLoading,
  isSuccess,
  isError,
}: Readonly<{
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}>) => {
  const [progress, setProgress] = useState(0);

  const resetProgress = () => setProgress(() => 0);

  useEffect(() => {
    if (isLoading) {
      setProgress(() => 50);
    }

    if (isSuccess || isError) {
      setProgress(() => 100);
    }
  }, [isError, isLoading, isSuccess]);

  return {
    progressLoadingBar: progress,
    resetProgressLoadingBar: resetProgress,
  };
};

export default useLoadingBar;
