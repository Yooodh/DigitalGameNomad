'use client';

// package
import { useCallback } from 'react';

// slice
import UserPresenter from '../presenters/Users.presenter';
import { useUserManagement } from '../hooks/useUserManagement';
import { useUserFiltering } from '../hooks/useUserFiltering';
import { useUserSorting } from '../hooks/useUserSorting';
import { useUserPagination } from '../hooks/useUserPagination';
import { useUserSelection } from '../hooks/useUserSelection';
import { useUserUtils } from '../hooks/useUserUtils';

export default function UserContainer() {
  const {
    users,
    setUsers,
    handlePasswordReset,
    handleUserRestore,
    handleHardDeleteUser,
    overallTotalUsers,
    totalActiveUsers,
    totalBusinessUsers,
    totalGeneralUsers,
    totalDeletedUsers,
  } = useUserManagement();

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
  } = useUserFiltering(users, (page) => setCurrentPage(page));

  const {
    sortBy,
    sortOrder,

    sortedUsers,
    handleSortChange,
    resetSorting,
  } = useUserSorting(filteredUsers, (page) => setCurrentPage(page));

  const itemsPerPage = 10;
  const {
    currentPage,
    setCurrentPage,
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
      alert('삭제할 사용자를 선택해주세요.');
      return;
    }

    if (
      confirm(
        `${selectedUserIds.size}명의 사용자를 정말로 삭제하시겠습니까? (향후 복구 가능)`
      )
    ) {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          selectedUserIds.has(user.id)
            ? { ...user, deleteDate: new Date().toISOString().slice(0, 10) }
            : user
        )
      );
      setSelectedUserIds(new Set());
      alert('선택된 사용자가 삭제(비활성화) 처리되었습니다.');
    }
  }, [selectedUserIds, setUsers, setSelectedUserIds]);

  return (
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
      handlePageChange={handlePageChange}
      generatePageNumbers={generatePageNumbers}
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
    />
  );
}
