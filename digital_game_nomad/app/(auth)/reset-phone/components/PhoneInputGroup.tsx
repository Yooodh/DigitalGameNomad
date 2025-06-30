// slice
import styles from '../styles/ResetPhone.module.scss';
import { PhoneInputGroupProps } from '../types';

// layer
import { ChevronDown } from '@/shared/icons';

export default function PhoneInputGroup({
  label,
  phoneName,
  phoneValue,
  carrierName,
  carrierValue,
  carriers,
  isSelectOpen,
  onChange,
  onSelectFocus,
  onSelectBlur,
  placeholder,
}: PhoneInputGroupProps) {
  return (
    <div className={styles.inputContainer}>
      <label className={styles.inputContainer__label}>{label}</label>
      <div
        className={`${styles.phoneInputContainer} ${
          isSelectOpen ? styles.phoneInputContainer__selectOpen : ''
        }`}
      >
        <div className={styles.selectWrapper}>
          <select
            name={carrierName}
            value={carrierValue}
            onChange={onChange}
            onFocus={onSelectFocus}
            onBlur={onSelectBlur}
            className={styles.phoneInputContainer__select}
          >
            {carriers.map((carrier) => (
              <option
                key={carrier}
                value={carrier === '통신사' ? '' : carrier}
                disabled={carrier === '통신사'}
                hidden={carrier === '통신사'}
              >
                {carrier}
              </option>
            ))}
          </select>
          <span className={styles.phoneInputContainer__selectIcon}>
            <ChevronDown />
          </span>
        </div>
        <input
          type='tel'
          name={phoneName}
          value={phoneValue}
          onChange={onChange}
          placeholder={placeholder}
          className={styles.phoneInputContainer__input}
          maxLength={13}
        />
      </div>
    </div>
  );
}
