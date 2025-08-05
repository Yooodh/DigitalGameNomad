// slice
import styles from '../styles/Edit.module.scss';
import { ActionBtnsProps } from '../types';

export default function ActionBtns({ saving, handleCancel }: ActionBtnsProps) {
  return (
    <div className={styles.btnContainer}>
      <button
        type='button'
        className={`${styles.navBtn} ${styles.cancelBtn}`}
        onClick={handleCancel}
        disabled={saving}
      >
        취소
      </button>
      <button
        type='submit'
        className={`${styles.navBtn} ${styles.saveBtn}`}
        disabled={saving}
      >
        저장
      </button>
    </div>
  );
}
