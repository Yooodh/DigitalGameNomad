// slice
import styles from '../styles/ResetPassword.module.scss';

// layer
import { Check } from '@/shared/icons';

export default function ThridStepCompletion() {
  return (
    <div className={styles.stepContainer}>
      <div className={styles.stepContainer__completionIcon}>
        <svg viewBox='0 0 24 23' className={styles.successIcon}>
          <Check />
        </svg>
      </div>
      <h2 className={styles.stepContainer__title}>비밀번호 변경 완료</h2>
      <p className={styles.stepContainer__desc}>
        비밀번호가 성공적으로 변경되었습니다
        <br />새 비밀번호로 로그인해주세요
      </p>
      <button
        type='button'
        onClick={() => (window.location.href = '/login')}
        className={`${styles.btn} ${styles.primary}`}
      >
        로그인 페이지로 이동
      </button>
    </div>
  );
}
