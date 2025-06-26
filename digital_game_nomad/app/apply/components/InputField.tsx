// slice
import styles from '../styles/Apply.module.scss';
import { InputFieldProps } from '../types';

export default function InputField({
  label,
  icon,
  type = 'text',
  value,
  onChange,
  placeholder,
  rows = 4,
  inputClassName,
  iconClassName,
  isRequired = true,
}: InputFieldProps) {
  const isTextArea = type === 'textarea';

  return (
    <div className={styles.fieldContainer}>
      <label className={styles.fieldContainer__label}>
        <span className={`${styles.icon} ${iconClassName || ''}`}>{icon}</span>
        {label}
        {isRequired && (
          <span className={styles.fieldContainer__required}>*</span>
        )}
      </label>
      {isTextArea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className={`${styles.textarea} ${inputClassName || ''}`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`${styles.input} ${inputClassName || ''}`}
        />
      )}
    </div>
  );
}
