import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const MAX_WAIT_MS = 3000;

const ScrollToTop = () => {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Home sections are lazy-loaded, so the target may not be in the DOM yet.
    const id = decodeURIComponent(hash.slice(1));
    const start = performance.now();
    let frame = 0;

    const tryScroll = () => {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (performance.now() - start < MAX_WAIT_MS) {
        frame = requestAnimationFrame(tryScroll);
      }
    };

    tryScroll();
    return () => cancelAnimationFrame(frame);
  }, [hash, pathname, key]);

  return null;
};

export default ScrollToTop;
