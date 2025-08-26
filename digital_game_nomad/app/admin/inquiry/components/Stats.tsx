// slice
import styles from '../styles/AdminInquiry.module.scss';
import { StatsProps } from '../types';

// layer
import { CheckCircle, Clock, Info } from '@/shared/icons';

export default function Stats({ inquiries }: StatsProps) {
  return (
    <div className={styles.statsContainer}>
      <div className={styles.cardContainer}>
        <div className={styles.cardContainer__icon}>
          <Info />
        </div>
        <div className={styles.contectContainer}>
          <div className={styles.contectContainer__num}>
            {inquiries.filter((i) => i.status === '접수').length}
          </div>
          <div className={styles.contectContainer__label}>새 문의</div>
        </div>
      </div>
      <div className={styles.cardContainer}>
        <div className={styles.cardContainer__icon}>
          <Clock />
        </div>
        <div className={styles.contectContainer}>
          <div className={styles.contectContainer__num}>
            {inquiries.filter((i) => i.status === '처리중').length}
          </div>
          <div className={styles.contectContainer__label}>처리중</div>
        </div>
      </div>
      <div className={styles.cardContainer}>
        <div className={styles.cardContainer__icon}>
          <CheckCircle />
        </div>
        <div className={styles.contectContainer}>
          <div className={styles.contectContainer__num}>
            {inquiries.filter((i) => i.status === '완료').length}
          </div>
          <div className={styles.contectContainer__label}>완료</div>
        </div>
      </div>
    </div>
  );
}
