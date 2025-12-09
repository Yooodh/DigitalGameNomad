// package
import { useState, useCallback, useMemo, useEffect } from 'react';
import { toast } from 'react-toastify';

// slice
import { UserData, SelectionState, FilterLevel } from '../types';

export const useUserSelection = (
  currentUsers: UserData[],
  currentPage: number,
  searchTerm: string,
  filterLevel: FilterLevel,
  showDeletedUsers: boolean
): SelectionState & {
  handleUserSelect: (userId: string, isSelected: boolean) => void;
  handleSelectAll: (checked: boolean) => void;
  handleDeleteSelectedUsers: () => void;
  handleCancelSelection: () => void;
  isAllSelectedOnPage: boolean;
  usersWithSelection: UserData[];
} => {
  const [selectedUserIds, setSelectedUserIds] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    setSelectedUserIds(new Set());
  }, [currentPage, searchTerm, filterLevel, showDeletedUsers]);

  const handleUserSelect = useCallback(
    (userId: string, isSelected: boolean) => {
      setSelectedUserIds((prevSelected) => {
        const newSelected = new Set(prevSelected);
        if (isSelected) {
          newSelected.add(userId);
        } else {
          newSelected.delete(userId);
        }
        return newSelected;
      });
    },
    []
  );

  const isAllSelectedOnPage = useMemo(() => {
    if (currentUsers.length === 0) return false;

    const activeUsersOnPage = currentUsers.filter((user) => !user.deleteDate);
    return (
      activeUsersOnPage.length > 0 &&
      activeUsersOnPage.every((user) => selectedUserIds.has(user.id))
    );
  }, [currentUsers, selectedUserIds]);

  const handleSelectAll = useCallback(
    (checked: boolean) => {
      setSelectedUserIds((prevSelected) => {
        const newSelected = new Set(prevSelected);
        currentUsers.forEach((user) => {
          if (!user.deleteDate) {
            if (checked) {
              newSelected.add(user.id);
            } else {
              newSelected.delete(user.id);
            }
          }
        });
        return newSelected;
      });
    },
    [currentUsers]
  );

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
      setSelectedUserIds(new Set());
      toast.success('선택된 사용자 삭제 요청이 처리되었습니다.');
    }
  }, [selectedUserIds]);

  const handleCancelSelection = useCallback(() => {
    setSelectedUserIds(new Set());
  }, []);

  const usersWithSelection = useMemo(() => {
    return currentUsers.map((user) => ({
      ...user,
      isSelected: selectedUserIds.has(user.id),
    }));
  }, [currentUsers, selectedUserIds]);

  return {
    selectedUserIds,
    setSelectedUserIds,
    handleUserSelect,
    handleSelectAll,
    handleDeleteSelectedUsers,
    handleCancelSelection,
    isAllSelectedOnPage,
    usersWithSelection,
  };
};
