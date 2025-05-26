import { useLenis } from 'lenis/react';
import { useEffect } from 'react';
import { useLocation } from 'react-router';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0);
    }
  }, [pathname, lenis]);

  return null;
}

export default ScrollToTop;
