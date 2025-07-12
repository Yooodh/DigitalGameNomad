// slice
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import Pagination from './Pagination';
import TableEmptyState from './TableEmptyState';
import styles from '../styles/Users.module.scss';
import { TableProps } from '../types';

// layer
import { Trash2, XCircle } from '@/shared/icons';

export default function Table({
  users,
  selectedUserIds,
  isAllSelectedOnPage,
  handleUserSelect,
  handleSelectAll,
  handlePasswordReset,
  handleUserRestore,
  handleDeleteSelectedUsers,
  handleCancelSelection,
  handleHardDeleteUser,
  getUserLevelText,
  getUserLevelClass,
  currentPage,
  totalPages,
  startIndex,
  endIndex,
  totalFilteredAndSortedUsersCount,
  handlePageChange,
  generatePageNumbers,
}: TableProps) {
  const hasSelectedUsers = selectedUserIds.size > 0;

  return (
    <div className={styles.tableContainer}>
      {hasSelectedUsers && (
        <div className={styles.selectBtnContainer}>
          <button
            className={styles.selectBtnContainer__delete}
            onClick={handleDeleteSelectedUsers}
          >
            <Trash2 /> 삭제 ({selectedUserIds.size})
          </button>
          <button
            className={styles.selectBtnContainer__cancel}
            onClick={handleCancelSelection}
            type='button'
          >
            <XCircle />
            취소
          </button>
        </div>
      )}

      <table className={styles.tableContainer__table}>
        <TableHeader
          isAllSelectedOnPage={isAllSelectedOnPage}
          handleSelectAll={handleSelectAll}
        />
        <tbody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              user={user}
              handleUserSelect={handleUserSelect}
              handlePasswordReset={handlePasswordReset}
              handleUserRestore={handleUserRestore}
              handleHardDeleteUser={handleHardDeleteUser}
              getUserLevelText={getUserLevelText}
              getUserLevelClass={getUserLevelClass}
            />
          ))}
        </tbody>
      </table>

      {users.length === 0 && <TableEmptyState />}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        startIndex={startIndex}
        endIndex={endIndex}
        totalFilteredAndSortedUsersCount={totalFilteredAndSortedUsersCount}
        handlePageChange={handlePageChange}
        generatePageNumbers={generatePageNumbers}
      />
    </div>
  );
}
