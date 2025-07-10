// slice
import styles from '../styles/Users.module.scss';
import { ShowDeletedUsersToggleProps } from '../types';

export default function ShowDeletedUsersToggle({
  showDeletedUsers,
  handleDeletedToggle,
}: ShowDeletedUsersToggleProps) {
  return (
    <label className={styles.checkboxContainer}>
      <input
        type='checkbox'
        checked={showDeletedUsers}
        onChange={(e) => handleDeletedToggle(e.target.checked)}
        className={styles.checkboxContainer__checkbox}
      />
      <span className={styles.checkboxContainer__text}>삭제된 사용자 표시</span>
    </label>
  );
}
