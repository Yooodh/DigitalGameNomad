// slice
import styles from '../styles/Profile.module.scss';
import { ActionProps } from '../types';

// layer
import { Edit3, Save, X } from '@/shared/icons';

export default function Action({
  editMode,
  isLoading,
  onEdit,
  onSave,
  onCancel,
}: ActionProps) {
  return (
    <div className={styles.actionContainer}>
      {!editMode ? (
        <button
          onClick={onEdit}
          className={`${styles.actionContainer__btn} ${styles.btnPrimary}`}
        >
          <Edit3 />
          편집
        </button>
      ) : (
        <div className={styles.actionContainer__edit}>
          <button
            onClick={onSave}
            disabled={isLoading}
            className={`${styles.actionContainer__btn} ${styles.btnSuccess}`}
          >
            <Save />
            {isLoading ? '저장중...' : '저장'}
          </button>

          <button
            onClick={onCancel}
            className={`${styles.actionContainer__btn} ${styles.btnSecondary}`}
          >
            <X />
            취소
          </button>
        </div>
      )}
    </div>
  );
}
