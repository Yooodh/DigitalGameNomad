// slice
import styles from './ConditionalButton.module.scss';
import { ButtonProps } from '../../types';

export default function ConditionalButton({
  children,
  onClick,
  disabled = false,
  className = '',
  buttonRef,
}: ButtonProps) {
  const buttonClasses = `${styles.button} ${
    !disabled ? styles.buttonActive : ''
  } ${className}`;

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
    >
      {children}
    </button>
  );
}
