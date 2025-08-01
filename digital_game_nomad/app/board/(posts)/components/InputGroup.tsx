'use client';

// slice
import styles from '../styles/BoardPost.module.scss';
import { InputGroupProps } from '../types';

export default function InputGroup({
  label,
  id,
  value,
  onChange,
  required,
  InputComponent,
  otherProps,
}: InputGroupProps) {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <InputComponent
        id={id}
        className={
          InputComponent === 'textarea' ? styles.textarea : styles.input
        }
        value={value}
        onChange={onChange}
        required={required}
        {...otherProps}
      />
    </div>
  );
}
