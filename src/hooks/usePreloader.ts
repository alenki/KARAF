import { useState, useCallback } from 'react';

export function usePreloader() {
  const [isLoading, setIsLoading] = useState(true);

  const finishLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  return { isLoading, finishLoading };
}
