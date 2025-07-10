// package
import { useState, useCallback } from 'react';

// slice
import { ApplicationData } from '../types';

export const useApplicationSelection = (
  filteredApplications: ApplicationData[]
) => {
  const [selectedApplications, setSelectedApplications] = useState<Set<string>>(
    new Set()
  );

  const onToggleApplicationSelection = useCallback((id: string) => {
    setSelectedApplications((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      return newSelected;
    });
  }, []);

  const onSelectAllApplications = useCallback(() => {
    setSelectedApplications((prevSelected) => {
      if (
        prevSelected.size === filteredApplications.length &&
        filteredApplications.length > 0
      ) {
        return new Set();
      } else {
        return new Set(filteredApplications.map((app) => app.id));
      }
    });
  }, [filteredApplications]);

  const clearSelection = useCallback(() => {
    setSelectedApplications(new Set());
  }, []);

  const showBulkActions = selectedApplications.size > 0;

  return {
    selectedApplications,
    onToggleApplicationSelection,
    onSelectAllApplications,
    clearSelection,
    showBulkActions,
  };
};
