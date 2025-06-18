// slice
import styles from '../styles/Login.module.scss';
import { FormInputProps } from '../types';

export default function FormInput({
  icon: Icon,
  type,
  name,
  placeholder,
  value,
  onChange,
  errorMessage,
  children,
}: FormInputProps) {
  return (
    <div className={styles.formContainer__inputGroup}>
      <div className={styles.formContainer__inputWrapper}>
        <span className={styles.inputIcon}>
          <Icon />
        </span>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`${styles.formContainer__input} ${
            errorMessage ? styles.inputError : ''
          }`}
        />
        {children}
      </div>
      {errorMessage && (
        <span className={styles.formContainer__errorMessage}>
          {errorMessage}
        </span>
      )}
    </div>
  );
}
