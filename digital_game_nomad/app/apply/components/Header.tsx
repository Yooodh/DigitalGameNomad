// slice
import styles from '../styles/Apply.module.scss';

export default function Header() {
  return (
    <div className={styles.headerContainer}>
      <h1 className={styles.headerContainer__title}>참여신청</h1>
      <p className={styles.headerContainer__subTitle}>
        게임 전시회에 참여하기 위한 정보를 입력해주세요.
      </p>
    </div>
  );
}
