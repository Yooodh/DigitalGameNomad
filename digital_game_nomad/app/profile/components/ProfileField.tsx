// slice
import styles from '../styles/Profile.module.scss';
import { ProfileFieldProps } from '../types';

export default function ProfileField({
  label,
  icon,
  value,
  editingValue,
  editMode,
  validationError,
  errorMessage,
  onInputChange,
  inputType = 'text',
  maxLength,
  placeholder,
}: ProfileFieldProps) {
  return (
    <div className={styles.fieldContainer}>
      <label className={styles.fieldContainer__label}>
        <span className={styles.icon}>{icon}</span>
        {label}
      </label>
      {editMode ? (
        <input
          type={inputType}
          value={editingValue}
          onChange={(e) => onInputChange(e.target.value)}
          className={`${styles.fieldContainer__input} ${
            validationError ? styles.inputError : ''
          }`}
          placeholder={placeholder}
          maxLength={maxLength}
        />
      ) : (
        <div className={styles.fieldContainer__value}>{value}</div>
      )}
      {validationError && editMode && (
        <p className={styles.fieldContainer__errorMessage}>{errorMessage}</p>
      )}
    </div>
  );
}
