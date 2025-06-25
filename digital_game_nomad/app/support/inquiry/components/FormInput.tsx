// slice
import styles from '../styles/Inquiry.module.scss';
import { FormInputProps } from '../types';

export default function FormInput({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  disabled,
  required = false,
}: FormInputProps) {
  return (
    <div className={styles.formContainer__inputWrap}>
      <label className={styles.formContainer__label} htmlFor={id}>
        {label}
        {required && <span className={styles.formContainer__required}>*</span>}
      </label>
      <input
        id={id}
        type={type}
        className={`${styles.input} ${error ? styles.inputError : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
}
