// slice
import styles from '../styles/ResetPassword.module.scss';
import { ProgressBarProps } from '../types';

export default function ProgressBar({ step }: ProgressBarProps) {
  return (
    <div className={styles.progressContainer}>
      {[1, 2, 3].map((num) => (
        <div
          key={num}
          className={`${styles.progressContainer__step} ${
            step >= num ? styles.active : ''
          }`}
        >
          <span className={styles.stepNumber}>{num}</span>
        </div>
      ))}
    </div>
  );
}
