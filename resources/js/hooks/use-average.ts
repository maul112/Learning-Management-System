import { useCallback } from 'react';

export function useAverage() {
  const getAverage = useCallback((data: number[]) => {
    return Math.round(data.reduce((a, b) => a + b, 0) / data.length);
  }, []);

  return getAverage;
}
