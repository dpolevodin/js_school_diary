import { useEffect, useState } from 'react';

const QUERY = '(max-width: 1023px)';

const getMatches = () => {
  return window.matchMedia(QUERY).matches;
};

export const useMobile = () => {
  const [matches, setMatches] = useState(getMatches());

  useEffect(() => {
    function handleChange() {
      setMatches(getMatches());
    }

    const matchMedia = window.matchMedia(QUERY);

    handleChange();

    matchMedia.addEventListener('change', handleChange);

    return () => {
      matchMedia.removeEventListener('change', handleChange);
    };
  }, []);

  return matches;
};
