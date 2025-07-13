// package
import { useState, useCallback, useMemo } from 'react';

// slice
import { UserData, FilterLevel, FilteringState } from '../types';

export const useUserFiltering = (
  users: UserData[],
  setCurrentPage: (page: number) => void
): FilteringState & {
  filteredUsers: UserData[];
  handleSearchChange: (value: string) => void;
  handleFilterChange: (value: FilterLevel) => void;
  handleDeletedToggle: (checked: boolean) => void;
} => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterLevel, setFilterLevel] = useState<FilterLevel>('all');
  const [showDeletedUsers, setShowDeletedUsers] = useState<boolean>(false);

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchTerm(value);
      setCurrentPage(1);
    },
    [setCurrentPage]
  );

  const handleFilterChange = useCallback(
    (value: FilterLevel) => {
      setFilterLevel(value);
      setCurrentPage(1);
    },
    [setCurrentPage]
  );

  const handleDeletedToggle = useCallback(
    (checked: boolean) => {
      setShowDeletedUsers(checked);
      setCurrentPage(1);
    },
    [setCurrentPage]
  );

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.nickname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesLevel =
        filterLevel === 'all' || user.userLevel === filterLevel;

      const matchesDeleteStatus = showDeletedUsers ? true : !user.deleteDate;

      return matchesSearch && matchesLevel && matchesDeleteStatus;
    });
  }, [users, searchTerm, filterLevel, showDeletedUsers]);

  return {
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
  };
};
