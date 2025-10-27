// slice
import styles from '../styles/Detail.module.scss';

// layer
import { Alert } from '@/shared/icons';

export default function EmptyState() {
  return (
    <div className={styles.emptyContainer}>
      <div className={styles.emptyContainer__icon}>
        <Alert />
      </div>
      <h3 className={styles.emptyContainer__title}>문의 내역이 없습니다.</h3>
    </div>
  );
}
