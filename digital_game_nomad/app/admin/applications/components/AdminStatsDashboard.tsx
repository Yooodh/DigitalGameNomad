// slice
import styles from '../styles/Applications.module.scss';
import { AdminStatsDashboardProps } from '../types';

// layer
import { Users, Clock, CheckCircle, XCircle } from '@/shared/icons';

export default function AdminStatsDashboard({
  totalApplications,
  pendingCount,
  approvedCount,
  rejectedCount,
}: AdminStatsDashboardProps) {
  return (
    <div className={styles.statsContainer}>
      <div className={styles.cardContainer}>
        <div className={styles.cardContainer__icon}>
          <Users />
        </div>
        <div className={styles.contectContainer}>
          <div className={styles.contectContainer__num}>
            {totalApplications}
          </div>
          <div className={styles.contectContainer__label}>총 신청</div>
        </div>
      </div>
      <div className={styles.cardContainer}>
        <div className={styles.cardContainer__icon}>
          <Clock />
        </div>
        <div className={styles.contectContainer}>
          <div className={styles.contectContainer__num}>{pendingCount}</div>
          <div className={styles.contectContainer__label}>검토 대기</div>
        </div>
      </div>
      <div className={styles.cardContainer}>
        <div className={styles.cardContainer__icon}>
          <CheckCircle />
        </div>
        <div className={styles.contectContainer}>
          <div className={styles.contectContainer__num}>{approvedCount}</div>
          <div className={styles.contectContainer__label}>승인됨</div>
        </div>
      </div>
      <div className={styles.cardContainer}>
        <div className={styles.cardContainer__icon}>
          <XCircle />
        </div>
        <div className={styles.contectContainer}>
          <div className={styles.contectContainer__num}>{rejectedCount}</div>
          <div className={styles.contectContainer__label}>거부됨</div>
        </div>
      </div>
    </div>
  );
}
