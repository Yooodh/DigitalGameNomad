// package
import Link from 'next/link';

// slice
import styles from '../styles/Register.module.scss';

export default function Footer() {
  return (
    <div className={styles.footerContainer}>
      <p className={styles.footerContainer__text}>
        이미 계정이 있으신가요?
        <Link href='./login'>
          <span className={styles.footerContainer__link}>로그인</span>
        </Link>
      </p>
    </div>
  );
}
