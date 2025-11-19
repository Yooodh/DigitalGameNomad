// slice
import styles from '../styles/AdminApplications.module.scss';

// layer
import { Building } from '@/shared/icons';

export default function EmptyApplicationsMessage() {
  return (
    <div className={styles.emptyContainer}>
      <div className={styles.emptyContainer__icon}>
        <Building />
      </div>
      <h3 className={styles.emptyContainer__title}>신청 내역이 없습니다.</h3>
      <p className={styles.emptyContainer__desc}>
        검색 조건에 맞는 신청서가 없습니다. 필터를 조정해 보세요.
      </p>
    </div>
  );
}
