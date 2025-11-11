// slice
import styles from '../styles/Login.module.scss';

export default function LoginHeader() {
  return (
    <div className={styles.headerContainer}>
      <h1 className={styles.headerContainer__title}>환영합니다</h1>
      <p className={styles.headerContainer__subtitle}>계정에 로그인하세요.</p>
    </div>
  );
}
