// slice
import styles from '../styles/ForgotPassword.module.scss';
import { InputGroupProps } from '../types';

// layer
import { Warning } from '@/shared/icons';

export default function InputGroup({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = 'text',
  error,
  maxLength,
  inputMode,
  autoFocus,
  countdown,
  formatTime,
}: InputGroupProps) {
  return (
    <div className={styles.inputContainer}>
      <label className={styles.inputContainer__label}>
        {label}
        {countdown !== undefined && countdown > 0 && formatTime && (
          <span className={styles.inputContainer__countdown}>
            {formatTime(countdown)}
          </span>
        )}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${styles.inputContainer__input} ${
          error ? styles.inputContainer__error : ''
        }`}
        maxLength={maxLength}
        inputMode={inputMode}
        autoFocus={autoFocus}
      />
      {error && (
        <div className={styles.inputContainer__errorMessage}>
          <svg className={styles.inputContainer__errorIcon} viewBox='0 0 24 21'>
            <Warning />
          </svg>
          {error}
        </div>
      )}
    </div>
  );
}
