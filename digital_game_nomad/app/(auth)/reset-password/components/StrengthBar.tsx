// slice
import styles from '../styles/ResetPassword.module.scss';
import { StrengthBarProps } from '../types';

export default function StrengthBar({
  strength,
  label,
  color,
}: StrengthBarProps) {
  return (
    <div className={styles.strengthContainer}>
      <div className={styles.strengthContainer__bar}>
        <div
          className={styles.strengthContainer__fill}
          style={{
            width: `${strength}%`,
            backgroundColor: color,
          }}
        ></div>
      </div>
      <span className={styles.strengthContainer__label} style={{ color }}>
        {label}
      </span>
    </div>
  );
}
