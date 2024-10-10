/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState } from 'react';

export const useDebounce = (
  callback: (...args: any[]) => void,
  delay: number
) => {
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const debouncedCallback = useCallback(
    (...args: any[]) => {
      if (timer) {
        clearTimeout(timer);
      }
      const newTimer = setTimeout(() => {
        callback(...args);
      }, delay);
      setTimer(newTimer);
    },
    [callback, delay, timer]
  );

  return debouncedCallback;
};
