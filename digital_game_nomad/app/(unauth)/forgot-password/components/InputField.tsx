// slice
import styles from '../styles/ForgotPassword.module.scss';
import { InputFieldProps } from '../types';

// layer
import PasswordToggleButton from '@/shared/components/PasswordToggleButton/PasswordToggleButton';
import { Warning } from '@/shared/icons';

export default function InputField({
  label,
  name,
  value,
  showPassword,
  onChange,
  onTogglePassword,
  placeholder,
  error,
}: InputFieldProps) {
  const inputType =
    showPassword === undefined ? 'text' : showPassword ? 'text' : 'password';

  return (
    <div className={styles.inputContainer}>
      <label className={styles.inputContainer__label}>{label}</label>
      <div className={styles.inputContainer__wrap}>
        <input
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${styles.inputContainer__input} ${
            error ? styles.inputContainer__error : ''
          }`}
        />

        {onTogglePassword && (
          <PasswordToggleButton
            showPassword={showPassword!}
            togglePasswordVisibility={onTogglePassword}
          />
        )}
      </div>
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
