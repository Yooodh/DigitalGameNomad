// slice
import styles from '../styles/Users.module.scss';
import { TableRowActionCellProps } from '../types';

// layer
import { Lock, RefreshCw } from '@/shared/icons';

export default function TableRowActionCell({
  user,
  handlePasswordReset,
  handleUserRestore,
}: TableRowActionCellProps) {
  return (
    <td
      className={styles.rowContainer__action}
      onClick={(e) => e.stopPropagation()}
    >
      {!user.deleteDate ? (
        <button
          onClick={() => handlePasswordReset(user.id, user.name)}
          className={styles.resetBtn}
          title='비밀번호 초기화'
        >
          <Lock />
        </button>
      ) : (
        <button
          onClick={() => handleUserRestore(user.id, user.name)}
          className={styles.restoreBtn}
          title='사용자 복구'
        >
          <RefreshCw />
        </button>
      )}
    </td>
  );
}
