// package
import { useState, useCallback, useMemo } from 'react';

// slice
import { UserData, UserSortField, SortOrder, SortingState } from '../types';

export const useUserSorting = (
  usersToSort: UserData[],
  setCurrentPage: (page: number) => void
): SortingState & {
  sortedUsers: UserData[];
  handleSortChange: (field: UserSortField) => void;
  resetSorting: () => void;
} => {
  const [sortBy, setSortBy] = useState<UserSortField>('joinDate');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const onToggleSort = useCallback(
    (field: UserSortField) => {
      if (sortBy === field) {
        setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
      } else {
        setSortBy(field);
        setSortOrder('desc');
      }
      setCurrentPage(1);
    },
    [sortBy, setCurrentPage]
  );

  const resetSorting = useCallback(() => {
    setSortBy('joinDate');
    setSortOrder('desc');
  }, []);

  const sortedUsers = useMemo(() => {
    const sortableData = [...usersToSort];

    sortableData.sort((a, b) => {
      let compareValue = 0;

      switch (sortBy) {
        case 'name':
          compareValue = a.name.localeCompare(b.name);
          break;
        case 'joinDate':
          compareValue =
            new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime();
          break;
        case 'lastLoginDate':
          const aDate = a.lastLoginDate
            ? new Date(a.lastLoginDate).getTime()
            : 0;
          const bDate = b.lastLoginDate
            ? new Date(b.lastLoginDate).getTime()
            : 0;
          compareValue = aDate - bDate;
          break;
        default:
          compareValue = 0;
      }
      return sortOrder === 'desc' ? -compareValue : compareValue;
    });
    return sortableData;
  }, [usersToSort, sortBy, sortOrder]);

  const handleSortChange = useCallback(
    (field: UserSortField) => {
      onToggleSort(field);
    },
    [onToggleSort]
  );

  return {
    sortBy,
    sortOrder,
    setSortBy,
    setSortOrder,
    sortedUsers,
    handleSortChange,
    resetSorting,
  };
};
