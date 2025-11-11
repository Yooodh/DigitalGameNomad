// slice
import styles from '../styles/Register.module.scss';

export default function Header() {
  return (
    <div className={styles.headerContainer}>
      <h1 className={styles.headerContainer__title}>회원가입</h1>
      <p className={styles.headerContainer__subtitle}>
        새로운 계정을 만들어보세요.
      </p>
    </div>
  );
}
