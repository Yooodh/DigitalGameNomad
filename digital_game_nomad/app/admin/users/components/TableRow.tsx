// slice
import TableRowActionCell from './TableRowActionCell';
import styles from '../styles/Users.module.scss';
import { TableRowProps } from '../types';

// layer
import { User } from '@/shared/icons';

export default function TableRow({
  user,
  handleUserSelect,
  handlePasswordReset,
  handleUserRestore,
  handleHardDeleteUser,
  getUserLevelText,
  getUserLevelClass,
}: TableRowProps) {
  const formattedPhone = user.phone?.[0]
    ? `[${user.phone[0]}] ${user.phone.slice(1).join('-')}`
    : user.phone.slice(1).join('-');

  return (
    <tr
      key={user.id || user.email}
      className={`${styles.rowContainer} ${
        user.deleteDate ? styles.deletedRow : ''
      }`}
      onClick={() => {
        if (user.deleteDate) {
          handleHardDeleteUser(user.id, user.name);
        } else {
          handleUserSelect(user.id, !user.isSelected);
        }
      }}
    >
      <td
        className={styles.rowContainer__checkbox}
        onClick={(e) => e.stopPropagation()}
      >
        {!user.deleteDate && (
          <input
            type='checkbox'
            checked={user.isSelected || false}
            onChange={(e) => handleUserSelect(user.id, e.target.checked)}
            className={styles.checkboxContainer__checkbox}
          />
        )}
      </td>
      <td className={styles.rowContainer__name}>
        <div className={styles.infoContainer}>
          <div className={styles.infoContainer__avatar}>
            <User />
          </div>
          <span>{user.name}</span>
        </div>
      </td>
      <td className={styles.rowContainer__nickname} data-label='닉네임'>
        @{user.nickname}
      </td>
      <td className={styles.rowContainer__email} data-label='이메일'>
        {user.email}
      </td>
      <td className={styles.rowContainer__phone} data-label='연락처'>
        {formattedPhone}
      </td>
      <td className={styles.rowContainer__level} data-label='등급'>
        <span
          className={`${styles.levelBadge} ${
            styles[getUserLevelClass(user.userLevel) as keyof typeof styles]
          }`}
        >
          {getUserLevelText(user.userLevel)}
        </span>
      </td>
      <td className={styles.rowContainer__date} data-label='가입일'>
        {user.joinDate}
      </td>
      <td className={styles.rowContainer__date} data-label='최근 접속일'>
        {user.lastLoginDate || 'N/A'}
      </td>
      <td className={styles.rowContainer__date} data-label='삭제일'>
        {user.deleteDate ? (
          <span className={styles.deletedDate}>{user.deleteDate}</span>
        ) : (
          <span className={styles.activeStatus}>활성</span>
        )}
      </td>
      <TableRowActionCell
        user={user}
        handlePasswordReset={handlePasswordReset}
        handleUserRestore={handleUserRestore}
      />
    </tr>
  );
}
