import { useState, useEffect } from 'react';

// Variables For Timing
const INTERVAL_TIME = 15;
const COUNT_TO = 99;
const START_COUNT_AT = 0;

const useLoadingHook = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [wait, setWait] = useState(0);

  // updates the loadingProgress number at each interval
  useEffect(() => {
    let count = START_COUNT_AT;
    const timer = setInterval(() => {
      if (count > COUNT_TO) {
        return setWait((prev) => prev + 1);
      }
      count++;
      setLoadingProgress((prev) => prev + 1);
    }, INTERVAL_TIME);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return [loadingProgress, wait];
};

export default useLoadingHook;
