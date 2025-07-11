// package
import { useState, useMemo, useCallback } from 'react';
import { ApplicationData, SortField, SortOrder } from '../types';

export const useApplicationSorting = (data: ApplicationData[]) => {
  const [sortBy, setSortBy] = useState<SortField>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const sortedData = useMemo(() => {
    const sortableData = [...data];
    sortableData.sort((a, b) => {
      let compareValue = 0;
      switch (sortBy) {
        case 'date':
          compareValue =
            new Date(a.submittedAt).getTime() -
            new Date(b.submittedAt).getTime();
          break;
        case 'name':
          compareValue = a.gameName.localeCompare(b.gameName);
          break;
        case 'status':
          const statusOrder: { [key in ApplicationData['status']]: number } = {
            pending: 1,
            rejected: 2,
            approved: 3,
          };
          compareValue = statusOrder[a.status] - statusOrder[b.status];
          break;
        default:
          compareValue = 0;
      }
      return sortOrder === 'desc' ? -compareValue : compareValue;
    });
    return sortableData;
  }, [data, sortBy, sortOrder]);

  const onToggleSort = useCallback(
    (field: SortField) => {
      if (sortBy === field) {
        setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
      } else {
        setSortBy(field);
        setSortOrder('desc');
      }
    },
    [sortBy]
  );

  const resetSorting = useCallback(() => {
    setSortBy('date');
    setSortOrder('desc');
  }, []);

  return {
    sortBy,
    sortOrder,
    sortedData,
    onToggleSort,
    resetSorting,
  };
};
