// slice
import styles from '../styles/Detail.module.scss';
import { StatsProps } from '../types';

// layer
import { CheckCircle, Clock, Info } from '@/shared/icons';

export default function Stats({
  totalInquiriesCount,
  processingInquiriesCount,
  completedInquiriesCount,
}: StatsProps) {
  return (
    <div className={styles.statsContainer}>
      <div className={styles.cardContainer}>
        <div className={styles.cardContainer__icon}>
          <Info />
        </div>
        <div className={styles.contectContainer}>
          <div className={styles.contectContainer__num}>
            {totalInquiriesCount}
          </div>
          <div className={styles.contectContainer__label}>총 문의</div>
        </div>
      </div>
      <div className={styles.cardContainer}>
        <div className={styles.cardContainer__icon}>
          <Clock />
        </div>
        <div className={styles.contectContainer}>
          <div className={styles.contectContainer__num}>
            {processingInquiriesCount}
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
            {completedInquiriesCount}
          </div>
          <div className={styles.contectContainer__label}>완료</div>
        </div>
      </div>
    </div>
  );
}
