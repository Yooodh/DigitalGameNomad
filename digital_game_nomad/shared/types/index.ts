import { RefObject } from 'react';

export type UseIntersectionVisibilityOptions = {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  offsetForLastItems?: number;
};

export type AnimatedBackgroundProps = {
  children?: React.ReactNode;
  variant?: 'default' | 'blue' | 'purple';
  intensity?: 'subtle' | 'default' | 'intense';
  position?: 'relative' | 'fixed' | 'absolute';
  fullscreen?: boolean;
  className?: string;
};

export type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  buttonRef?: RefObject<HTMLButtonElement | null>;
};

export type PasswordToggleButtonProps = {
  showPassword: boolean;
  togglePasswordVisibility: () => void;
};

export type SpinnerProps = {
  message?: string;
};

export type ScrollBehavior = 'auto' | 'smooth';
