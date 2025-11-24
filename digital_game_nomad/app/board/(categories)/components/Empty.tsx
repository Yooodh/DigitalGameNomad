// slice
import styles from '../styles/BoardCategory.module.scss';

// layer
import { Alert } from '@/shared/icons';

export default function Empty() {
  return (
    <div className={styles.emptyContainer}>
      <div className={styles.emptyContainer__icon}>
        <Alert />
      </div>
      <h3 className={styles.emptyContainer__title}>검색 결과가 없습니다.</h3>
    </div>
  );
}
