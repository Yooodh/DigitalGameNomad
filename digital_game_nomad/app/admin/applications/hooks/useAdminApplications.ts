// package
import { useEffect, useCallback } from 'react';

// slice
import { useApplicationData } from './useApplicationData';
import { useApplicationFiltering } from './useApplicationFiltering';
import { useApplicationSorting } from './useApplicationSorting';
import { useApplicationSelection } from './useApplicationSelection';
import { useApplicationBulkActions } from './useApplicationBulkActions';
import { ApplicationData } from '../types';

export const useAdminApplications = (
  initialApplications: ApplicationData[]
) => {
  const { applications, setApplications, onChangeStatus, getStatusCount } =
    useApplicationData(initialApplications);

  const {
    searchTerm,
    statusFilter,
    filteredData,
    onSearchChange,
    onStatusFilterChange,
    resetFilters: resetFiltering,
  } = useApplicationFiltering(applications);

  const {
    sortBy,
    sortOrder,
    sortedData: filteredApplications,
    onToggleSort,
    resetSorting,
  } = useApplicationSorting(filteredData);

  const {
    selectedApplications,
    onToggleApplicationSelection,
    onSelectAllApplications,
    clearSelection,
    showBulkActions,
  } = useApplicationSelection(filteredApplications);

  const { onBulkStatusChange, onBulkDelete } = useApplicationBulkActions(
    setApplications,
    selectedApplications,
    clearSelection
  );

  useEffect(() => {
    setApplications(initialApplications);

    clearSelection();
  }, [initialApplications, setApplications, clearSelection]);

  const onResetFilters = useCallback(() => {
    resetFiltering();
    resetSorting();
    clearSelection();
  }, [resetFiltering, resetSorting, clearSelection]);

  return {
    applications,
    searchTerm,
    statusFilter,
    sortBy,
    sortOrder,
    filteredApplications,
    selectedApplications,
    showBulkActions,
    onSearchChange,
    onStatusFilterChange,
    onResetFilters,
    onToggleSort,
    onToggleApplicationSelection,
    onSelectAllApplications,
    onBulkStatusChange,
    onBulkDelete,
    onChangeStatus,
    getStatusCount,
  };
};
