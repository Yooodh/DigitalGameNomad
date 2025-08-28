// package
import { useCallback } from 'react';

// slice
import { ApplicationData } from '../types';

// layer
import { useApplicationsStore } from '@/shared/stores/useApplicationsStore';

export const useApplicationBulkActions = (
  selectedApplicationIds: Set<string>,
  clearSelection: () => void
) => {
  const bulkUpdateApplicationStatus = useApplicationsStore(
    (state) => state.bulkUpdateApplicationStatus
  );
  const deleteApplications = useApplicationsStore(
    (state) => state.deleteApplications
  );

  const onBulkStatusChange = useCallback(
    (newStatus: ApplicationData['status']) => {
      bulkUpdateApplicationStatus(
        Array.from(selectedApplicationIds),
        newStatus
      );
      clearSelection();
    },
    [bulkUpdateApplicationStatus, selectedApplicationIds, clearSelection]
  );

  const onBulkDelete = useCallback(() => {
    if (
      window.confirm(
        `${selectedApplicationIds.size}개의 항목을 정말 삭제하시겠습니까?`
      )
    ) {
      deleteApplications(Array.from(selectedApplicationIds));
      clearSelection();
    }
  }, [deleteApplications, selectedApplicationIds, clearSelection]);

  return {
    onBulkStatusChange,
    onBulkDelete,
  };
};
