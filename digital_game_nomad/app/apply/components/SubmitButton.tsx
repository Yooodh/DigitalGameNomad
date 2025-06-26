// slice
import styles from '../styles/Apply.module.scss';
import { SubmitButtonProps } from '../types';

export default function SubmitButton({ onSubmit }: SubmitButtonProps) {
  return (
    <div className={styles.submitContainer}>
      <button
        type='button'
        onClick={onSubmit}
        className={styles.submitContainer__btn}
      >
        참여신청 제출하기
      </button>
    </div>
  );
}
