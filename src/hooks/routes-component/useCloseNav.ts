import { useEffect, type MutableRefObject } from 'react';

const useCloseNav = ({
  navBtnElem,
  hide,
}: {
  navBtnElem: MutableRefObject<HTMLButtonElement | null>;
  hide: () => void;
}) => {
  useEffect(() => {
    const handleClick = (ev: MouseEvent) => {
      const targetElem = ev.target as HTMLElement;
      if (targetElem) {
        const navigationBtnElem = targetElem.closest('.btn-nav');
        if (navigationBtnElem !== navBtnElem.current) {
          hide();
        }
      }
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [hide, navBtnElem]);
};

export default useCloseNav;
