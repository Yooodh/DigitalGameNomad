// slice
import styles from './PasswordToggleButton.module.scss';
import { PasswordToggleButtonProps } from '../../types';
import { Eye, EyeOff } from '../../icons';

export default function PasswordToggleButton({
  showPassword,
  togglePasswordVisibility,
}: PasswordToggleButtonProps) {
  return (
    <button
      type='button'
      onClick={togglePasswordVisibility}
      className={styles.eyeBtn}
    >
      {showPassword ? <EyeOff /> : <Eye />}
    </button>
  );
}
