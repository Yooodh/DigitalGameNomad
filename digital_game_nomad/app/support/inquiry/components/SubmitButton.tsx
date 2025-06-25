// slice
import styles from '../styles/Inquiry.module.scss';
import { SubmitButtonProps } from '../types';

export default function SubmitButton({
  isSubmitting,
  onClick,
  label,
  submittingLabel = '등록 중...',
}: SubmitButtonProps) {
  return (
    <div className={styles.btnContainer}>
      <button
        type='button'
        className={styles.btnContainer__btn}
        onClick={onClick}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span className={styles.btnContainer__loaderWrap}>
            <div className={styles.btnContainer__loader}></div>
            {submittingLabel}
          </span>
        ) : (
          label
        )}
      </button>
    </div>
  );
}
