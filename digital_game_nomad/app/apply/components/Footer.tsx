// slice
import styles from '../styles/Apply.module.scss';

export default function Footer() {
  return (
    <div className={styles.footerContainer}>
      <p className={styles.footerContainer__notify}>
        참여 신청 완료 시 기업 등급으로 변경됩니다.
      </p>
      <p className={styles.footerContainer__guide}>
        신청서 제출 후 검토를 거쳐 승인 여부를 안내드립니다.
      </p>
    </div>
  );
}
