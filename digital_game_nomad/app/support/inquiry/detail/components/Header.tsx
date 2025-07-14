// slice
import styles from '../styles/Detail.module.scss';

export default function Header() {
  return (
    <div className={styles.headerContainer}>
      <h1 className={styles.headerContainer__title}>문의내역</h1>
      <p className={styles.headerContainer__subtitle}>
        문의하신 내용을 확인하고 답변을 받아보세요
      </p>
    </div>
  );
}
