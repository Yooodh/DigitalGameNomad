// slice
import styles from '../styles/Register.module.scss';
import { InputGroupProps } from '../types';

export default function InputGroup({
  label,
  children,
  errorMessage,
  successMessage,
  showError,
  showSuccess,
}: InputGroupProps) {
  return (
    <div className={styles.groupContainer}>
      <label className={styles.groupContainer__label}>{label}</label>
      {children}
      {showError && errorMessage && (
        <p className={styles.groupContainer__errorMessage}>{errorMessage}</p>
      )}
      {showSuccess && successMessage && (
        <p className={styles.groupContainer__successMessage}>
          {successMessage}
        </p>
      )}
    </div>
  );
}
