// slice
import styles from './AnimatedBackground.module.scss';
import { AnimatedBackgroundProps } from '@/shared/types';

export default function AnimatedBackground({
  children,
  variant = 'default',
  intensity = 'default',
  position = 'relative',
  fullscreen = false,
  className = '',
}: AnimatedBackgroundProps) {
  const baseClass = styles.animatedBackground;
  const variantClass =
    variant !== 'default' ? styles[`animatedBackground--${variant}`] : '';
  const intensityClass =
    intensity !== 'default' ? styles[`animatedBackground--${intensity}`] : '';
  const positionClass =
    position !== 'relative' ? styles[`animatedBackground--${position}`] : '';
  const fullscreenClass = fullscreen
    ? styles['animatedBackground--fullscreen']
    : '';

  const combinedClassName = [
    baseClass,
    variantClass,
    intensityClass,
    positionClass,
    fullscreenClass,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={combinedClassName}>
      {children && (
        <div className={styles.animatedBackground__content}>{children}</div>
      )}
    </div>
  );
}
