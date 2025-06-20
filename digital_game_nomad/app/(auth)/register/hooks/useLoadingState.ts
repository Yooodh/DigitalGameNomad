// package
import { useState } from 'react';

export const useLoadingState = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return { isLoading, setIsLoading };
};
