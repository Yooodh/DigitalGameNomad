// slice
import styles from '../styles/ResetPhone.module.scss';
import { ProgressBarProps } from '../types';

export default function ProgressBar({
  currentStep,
  totalSteps,
}: ProgressBarProps) {
  return (
    <div className={styles.progressContainer}>
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((num) => (
        <div
          key={num}
          className={`${styles.progressContainer__step} ${
            currentStep >= num ? styles.active : ''
          }`}
        >
          <span className={styles.stepNumber}>{num}</span>
        </div>
      ))}
    </div>
  );
}
