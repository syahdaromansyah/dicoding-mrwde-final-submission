import useLoadingBar from '@/hooks/useLoadingBar';
import LoadingBar from 'react-top-loading-bar';

export default function LoadingProgress({
  isLoading,
  isSuccess,
  isError,
}: Readonly<{
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}>) {
  const { progressLoadingBar, resetProgressLoadingBar } = useLoadingBar({
    isLoading,
    isSuccess,
    isError,
  });

  return (
    <LoadingBar
      color="#8b5cf6"
      progress={progressLoadingBar}
      onLoaderFinished={() => resetProgressLoadingBar()}
    />
  );
}
