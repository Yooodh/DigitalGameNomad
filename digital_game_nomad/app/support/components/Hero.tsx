// slice
import styles from '../styles/Support.module.scss';

export default function Hero() {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.heroContainer__hero}>
        <h1 className={styles.heroContainer__title}>고객센터</h1>
        <p className={styles.heroContainer__subTitle}>
          궁금한 점이 있으시면 언제든지 문의해주세요
        </p>
      </div>
    </div>
  );
}
