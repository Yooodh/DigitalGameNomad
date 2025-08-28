// slice
import styles from '../styles/AdminApplications.module.scss';
import { AdminBulkActionsProps } from '../types';

// layer
import { CheckCircle, XCircle, Trash2 } from '@/shared/icons';

export default function AdminBulkActions({
  selectedCount,
  totalFilteredCount,
  onSelectAll,
  onBulkStatusChange,
  onBulkDelete,
}: AdminBulkActionsProps) {
  return (
    <div className={styles.bulkContainer}>
      <div className={styles.bulkContainer__info}>
        {selectedCount}개 항목 선택됨
      </div>
      <div className={styles.btnContainer}>
        <button
          onClick={onSelectAll}
          className={`${styles.btnContainer__btn} ${styles.selectToggle}`}
        >
          <CheckCircle />
          {selectedCount === totalFilteredCount && totalFilteredCount > 0
            ? '일괄 해제'
            : '일괄 선택'}
        </button>
        <button
          onClick={() => onBulkStatusChange('approved')}
          className={`${styles.btnContainer__btn} ${styles.approve}`}
        >
          <CheckCircle />
          승인
        </button>
        <button
          onClick={() => onBulkStatusChange('rejected')}
          className={`${styles.btnContainer__btn} ${styles.reject}`}
        >
          <XCircle />
          거부
        </button>
        <button
          onClick={onBulkDelete}
          className={`${styles.btnContainer__btn} ${styles.delete}`}
        >
          <Trash2 />
          삭제
        </button>
      </div>
    </div>
  );
}
