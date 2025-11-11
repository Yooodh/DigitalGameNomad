// package
import Link from 'next/link';

// slice
import styles from '../styles/Login.module.scss';

export default function LoginFooter() {
  return (
    <div className={styles.footerContainer}>
      <p className={styles.footerContainer__Txt}>
        계정이 없으신가요?{' '}
        <Link href='/register' className={styles.footerContainer__signupLink}>
          회원가입
        </Link>
      </p>
    </div>
  );
}
