'use client';

// package
import { useState, useEffect } from 'react';

// slice
import LoadingPresenter from '../presenter/LoadingPresenter';
import { LoadingContainerProps } from '../types';

export default function LoadingContainer({
  children,
  message,
}: LoadingContainerProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingPresenter message={message} />;
  }

  return <>{children}</>;
}
