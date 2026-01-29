import { useState, useCallback } from 'react';

export function usePreloader() {
  const [isLoading, setIsLoading] = useState(true);

  const finishLoading = useCallback(() => {
    setIsLoading(false);
    document.body.classList.remove('is-loading');
    document.documentElement.classList.remove('is-loading');
  }, []);

  return { isLoading, finishLoading };
}
