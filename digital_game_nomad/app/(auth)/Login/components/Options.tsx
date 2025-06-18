// slice
import Link from 'next/link';
import styles from '../styles/Login.module.scss';

export default function Options() {
  return (
    <div className={styles.optionContainer}>
      <label className={styles.optionContainer__checkboxWrap}>
        <input type='checkbox' className={styles.optionContainer__checkbox} />
        <span className={styles.optionContainer__checkboxTxt}>
          로그인 상태 유지
        </span>
      </label>
      <Link href='/forgot-password'>
        <p className={styles.optionContainer__forgotPassword}>
          비밀번호를 잊으셨나요?
        </p>
      </Link>
    </div>
  );
}
