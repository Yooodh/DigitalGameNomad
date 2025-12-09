'use client';

// package
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

// slice
import UserPresenter from '../presenter/UsersPresenter';
import { useUserManagement } from '../hooks/useUserManagement';
import { useUserFiltering } from '../hooks/useUserFiltering';
import { useUserSorting } from '../hooks/useUserSorting';
import { useUserPagination } from '../hooks/useUserPagination';
import { useUserSelection } from '../hooks/useUserSelection';
import { useUserUtils } from '../hooks/useUserUtils';

// layer
import { useRegisteredUsersStore } from '@/shared/stores/useRegisteredUsersStore';
import { Loading } from '@/features/loading';

export default function UsersContainer() {
  const updateUserProfileInStore = useRegisteredUsersStore(
    (state) => state.updateUserProfile
  );
  const removeUserFromStore = useRegisteredUsersStore(
    (state) => state.removeUser
  );

  const {
    users,
    handlePasswordReset: baseHandlePasswordReset,
    handleUserRestore: baseHandleUserRestore,
    handleHardDeleteUser: baseHandleHardDeleteUser,
    overallTotalUsers,
    totalActiveUsers,
    totalBusinessUsers,
    totalGeneralUsers,
    totalDeletedUsers,
  } = useUserManagement();

  const [currentPage, setCurrentPage] = useState<number>(1);

  const {
    searchTerm,
    filterLevel,
    showDeletedUsers,
    setSearchTerm,
    setFilterLevel,
    setShowDeletedUsers,
    filteredUsers,
    handleSearchChange,
    handleFilterChange,
    handleDeletedToggle,
  } = useUserFiltering(users, setCurrentPage);

  const { sortBy, sortOrder, sortedUsers, handleSortChange, resetSorting } =
    useUserSorting(filteredUsers, setCurrentPage);

  const itemsPerPage = 10;
  const {
    totalPages,
    startIndex,
    endIndex,
    currentUsers: paginatedUsers,
    totalFilteredAndSortedUsersCount,
    handlePageChange,
    generatePageNumbers,
  } = useUserPagination(sortedUsers, itemsPerPage);

  const {
    selectedUserIds,
    setSelectedUserIds,
    handleUserSelect,
    handleSelectAll,
    handleCancelSelection,
    isAllSelectedOnPage,
    usersWithSelection,
  } = useUserSelection(
    paginatedUsers,
    currentPage,
    searchTerm,
    filterLevel,
    showDeletedUsers
  );

  const { getUserLevelText, getUserLevelClass } = useUserUtils();

  const handleResetFilters = useCallback(() => {
    setSearchTerm('');
    setFilterLevel('all');
    setShowDeletedUsers(false);
    resetSorting();
    setCurrentPage(1);
    setSelectedUserIds(new Set());
  }, [
    setSearchTerm,
    setFilterLevel,
    setShowDeletedUsers,
    resetSorting,
    setCurrentPage,
    setSelectedUserIds,
  ]);

  const handleDeleteSelectedUsers = useCallback(() => {
    if (selectedUserIds.size === 0) {
      toast.info('삭제할 사용자를 선택해주세요.');
      return;
    }

    if (
      window.confirm(
        `${selectedUserIds.size}명의 사용자를 정말로 삭제하시겠습니까? (향후 복구 가능)`
      )
    ) {
      selectedUserIds.forEach((userId) => {
        const userToUpdate = users.find((u) => u.id === userId);
        if (userToUpdate) {
          updateUserProfileInStore(userToUpdate.email, {
            deleteDate: new Date().toISOString().slice(0, 10),
          });
        }
      });
      setSelectedUserIds(new Set());
      toast.success('선택된 사용자가 삭제(비활성화) 처리되었습니다.');
    }
  }, [selectedUserIds, users, updateUserProfileInStore, setSelectedUserIds]);

  const handlePasswordReset = useCallback(
    (userId: string, userName: string) => {
      const userEmail = users.find((u) => u.id === userId)?.email;
      if (userEmail) {
        baseHandlePasswordReset(userEmail, userName);
      } else {
        console.warn(
          `사용자 ID ${userId}를 찾을 수 없어 비밀번호를 초기화할 수 없습니다.`
        );
      }
    },
    [users, baseHandlePasswordReset]
  );

  const handleUserRestore = useCallback(
    (userId: string, userName: string) => {
      const userEmail = users.find((u) => u.id === userId)?.email;
      if (userEmail) {
        baseHandleUserRestore(userEmail, userName);
      } else {
        console.warn(`사용자 ID ${userId}를 찾을 수 없어 복구할 수 없습니다.`);
      }
    },
    [users, baseHandleUserRestore]
  );

  const handleHardDeleteUser = useCallback(
    (userId: string, userName: string) => {
      const userEmail = users.find((u) => u.id === userId)?.email;
      if (userEmail) {
        baseHandleHardDeleteUser(userEmail, userName);
      } else {
        console.warn(
          `사용자 ID ${userId}를 찾을 수 없어 완전히 삭제할 수 없습니다.`
        );
      }
    },
    [users, baseHandleHardDeleteUser]
  );

  return (
    <Loading message='유저 목록 불러오는 중...'>
      <UserPresenter
        searchTerm={searchTerm}
        filterLevel={filterLevel}
        showDeletedUsers={showDeletedUsers}
        handleSearchChange={handleSearchChange}
        handleFilterChange={handleFilterChange}
        handleDeletedToggle={handleDeletedToggle}
        handleResetFilters={handleResetFilters}
        sortBy={sortBy}
        sortOrder={sortOrder}
        handleSortChange={handleSortChange}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalPages={totalPages}
        startIndex={startIndex}
        endIndex={endIndex}
        totalFilteredAndSortedUsersCount={totalFilteredAndSortedUsersCount}
        users={usersWithSelection}
        selectedUserIds={selectedUserIds}
        isAllSelectedOnPage={isAllSelectedOnPage}
        handleUserSelect={handleUserSelect}
        handleSelectAll={handleSelectAll}
        handleDeleteSelectedUsers={handleDeleteSelectedUsers}
        handleCancelSelection={handleCancelSelection}
        handlePasswordReset={handlePasswordReset}
        handleUserRestore={handleUserRestore}
        handleHardDeleteUser={handleHardDeleteUser}
        getUserLevelText={getUserLevelText}
        getUserLevelClass={getUserLevelClass}
        totalActiveUsers={totalActiveUsers}
        totalBusinessUsers={totalBusinessUsers}
        totalGeneralUsers={totalGeneralUsers}
        totalDeletedUsers={totalDeletedUsers}
        overallTotalUsers={overallTotalUsers}
        generatePageNumbers={generatePageNumbers}
        handlePageChange={handlePageChange}
      />
    </Loading>
  );
}
