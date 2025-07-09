// slice
import styles from '../styles/Applications.module.scss';
import { AdminApplicationCardActionsProps } from '../types';

// layer
import { Eye, Edit, MoreVertical } from '@/shared/icons';

export default function AdminApplicationCardActions({
  application,
  onView,
  onEdit,
}: AdminApplicationCardActionsProps) {
  return (
    <div className={styles.actionContainer}>
      <button
        onClick={() => onView?.(application)}
        className={styles.actionContainer__btn}
        title='상세보기'
      >
        <Eye />
      </button>
      <button
        onClick={() => onEdit?.(application)}
        className={styles.actionContainer__btn}
        title='편집'
      >
        <Edit />
      </button>
      <button className={styles.actionContainer__btn} title='더보기'>
        <MoreVertical />
      </button>
    </div>
  );
}
