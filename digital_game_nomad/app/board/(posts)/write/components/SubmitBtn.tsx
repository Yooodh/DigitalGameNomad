// slice
import styles from '../styles/Write.module.scss';
import { SubmitBtnProps } from '../types';

export default function SubmitBtn({ isReviewMode }: SubmitBtnProps) {
  return (
    <div className={styles.submitContainer}>
      <button type='submit' className={styles.submitContainer__btn}>
        {isReviewMode ? '후기 작성 완료' : '작성 완료'}
      </button>
    </div>
  );
}
