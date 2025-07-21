// slice
import styles from '../styles/ProgressBar.module.scss';
import { ProgressBarPresenterProps } from '../types/ProgressBar.types';

export default function ProgressBarPresenter({
  currentStep,
  totalSteps,
}: ProgressBarPresenterProps) {
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
