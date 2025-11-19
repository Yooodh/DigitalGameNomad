// slice
import styles from '../styles/Users.module.scss';

// layer
import { Users } from '@/shared/icons';

export default function TableEmptyState() {
  return (
    <div className={styles.emptyContainer}>
      <div className={styles.emptyContainer__icon}>
        <Users />
      </div>
      <h3 className={styles.emptyContainer__title}>검색 결과가 없습니다.</h3>
      <p className={styles.emptyContainer__desc}>
        다른 검색어나 필터를 시도해보세요.
      </p>
    </div>
  );
}
