import { ReactNode } from 'react';

export type LoadingContainerProps = {
  children: ReactNode;
  message?: string;
};

export type LoadingPresenterProps = {
  message?: string;
};
