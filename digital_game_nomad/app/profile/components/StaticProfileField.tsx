// slice
import styles from '../styles/Profile.module.scss';
import { StaticProfileFieldProps } from '../types';

export default function StaticProfileField({
  label,
  icon,
  value,
  badgeText,
}: StaticProfileFieldProps) {
  return (
    <div className={styles.fieldContainer}>
      <label className={styles.fieldContainer__label}>
        <span className={styles.icon}>{icon}</span>
        {label}
      </label>
      <div className={styles.fieldContainer__value}>
        {value}
        {badgeText && (
          <span className={styles.fieldContainer__badge}>{badgeText}</span>
        )}
      </div>
    </div>
  );
}
