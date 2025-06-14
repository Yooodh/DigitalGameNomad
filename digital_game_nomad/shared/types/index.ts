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
