import { useState } from 'react';

const useShow = () => {
  const [isShown, setIsShown] = useState(false);

  const show = () => setIsShown(() => true);
  const hide = () => setIsShown(() => false);

  return { isShown, show, hide };
};

export default useShow;
