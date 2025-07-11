// package
import { useState, useMemo, useCallback } from 'react';

// slice
import { ApplicationData, StatusFilter } from '../types';

export const useApplicationFiltering = (applications: ApplicationData[]) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const filteredData = useMemo(() => {
    let filtered = applications;

    if (searchTerm) {
      filtered = filtered.filter(
        (app) =>
          app.gameName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.contactEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.contactPhone.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((app) => app.status === statusFilter);
    }

    return filtered;
  }, [applications, searchTerm, statusFilter]);

  const onSearchChange = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  const onStatusFilterChange = useCallback((status: StatusFilter) => {
    setStatusFilter(status);
  }, []);

  const resetFilters = useCallback(() => {
    setSearchTerm('');
    setStatusFilter('all');
  }, []);

  return {
    searchTerm,
    statusFilter,
    filteredData,
    onSearchChange,
    onStatusFilterChange,
    resetFilters,
  };
};
