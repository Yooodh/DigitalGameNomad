// slice
import styles from '../styles/Users.module.scss';
import { StatsCardsProps } from '../types';

// layer
import { Users, Building, User, XCircle, CheckCircle } from '@/shared/icons';

export default function StatsCards({
  totalActiveUsers,
  totalBusinessUsers,
  totalGeneralUsers,
  totalDeletedUsers,
  overallTotalUsers,
}: StatsCardsProps) {
  return (
    <div className={styles.statsContainer}>
      <div className={styles.cardContainer}>
        <div className={styles.cardContainer__icon}>
          <CheckCircle />
        </div>
        <div className={styles.contectContainer}>
          <div className={styles.contectContainer__num}>{totalActiveUsers}</div>
          <span className={styles.contectContainer__label}>활성 유저</span>
        </div>
      </div>

      <div className={styles.cardContainer}>
        <div className={styles.cardContainer__icon}>
          <Building />
        </div>
        <div className={styles.contectContainer}>
          <div className={styles.contectContainer__num}>
            {totalBusinessUsers}
          </div>
          <span className={styles.contectContainer__label}>기업 유저</span>
        </div>
      </div>

      <div className={styles.cardContainer}>
        <div className={styles.cardContainer__icon}>
          <User />
        </div>
        <div className={styles.contectContainer}>
          <div className={styles.contectContainer__num}>
            {totalGeneralUsers}
          </div>
          <span className={styles.contectContainer__label}>일반 유저</span>
        </div>
      </div>

      <div className={styles.cardContainer}>
        <div className={styles.cardContainer__icon}>
          <XCircle />
        </div>
        <div className={styles.contectContainer}>
          <div className={styles.contectContainer__num}>
            {totalDeletedUsers}
          </div>
          <span className={styles.contectContainer__label}>탈퇴 유저</span>
        </div>
      </div>

      <div className={styles.cardContainer}>
        <div className={styles.cardContainer__icon}>
          <Users />
        </div>
        <div className={styles.contectContainer}>
          <div className={styles.contectContainer__num}>
            {overallTotalUsers}
          </div>
          <span className={styles.contectContainer__label}>전체 유저</span>
        </div>
      </div>
    </div>
  );
}
