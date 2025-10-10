// slice
import Link from 'next/link';
import styles from '../styles/Login.module.scss';

export default function Options() {
  return (
    <div className={styles.optionContainer}>
      <Link href='/forgot-password'>
        <p className={styles.optionContainer__forgotPassword}>
          비밀번호를 잊으셨나요?
        </p>
      </Link>
    </div>
  );
}
