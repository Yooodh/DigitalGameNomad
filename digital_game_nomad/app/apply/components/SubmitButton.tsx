// slice
import styles from '../styles/Apply.module.scss';
import { SubmitButtonProps } from '../types';

export default function SubmitButton({
  onSubmit,
  isSubmitting,
  label,
  submittingLabel = '',
}: SubmitButtonProps) {
  return (
    <div className={styles.submitContainer}>
      <button
        type='button'
        onClick={onSubmit}
        className={styles.submitContainer__btn}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span className={styles.submitContainer__loaderWrap}>
            {submittingLabel}
            <div className={styles.submitContainer__loader}></div>
          </span>
        ) : (
          label
        )}
      </button>
    </div>
  );
}
