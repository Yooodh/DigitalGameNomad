// slice
import styles from '../styles/Inquiry.module.scss';
import { FormTextareaProps } from '../types';

export default function FormTextarea({
  id,
  label,
  placeholder,
  value,
  onChange,
  error,
  disabled,
  required = false,
  rows = 8,
}: FormTextareaProps) {
  return (
    <div className={styles.formContainer__inputWrap}>
      <label className={styles.formContainer__label} htmlFor={id}>
        {label}
        {required && <span className={styles.formContainer__required}>*</span>}
      </label>
      <textarea
        id={id}
        className={`${styles.textarea} ${error ? styles.inputError : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        rows={rows}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
}
