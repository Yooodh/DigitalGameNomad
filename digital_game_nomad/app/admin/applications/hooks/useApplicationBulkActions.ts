// package
import { useCallback } from 'react';

// slice
import { ApplicationData } from '../types';
import { SetApplicationsFunction, ClearSelectionFunction } from '../types';

export const useApplicationBulkActions = (
  setApplications: SetApplicationsFunction,
  selectedApplicationIds: Set<string>,
  clearSelection: ClearSelectionFunction
) => {
  const onBulkStatusChange = useCallback(
    (newStatus: ApplicationData['status']) => {
      setApplications((prevApps) =>
        prevApps.map((app) =>
          selectedApplicationIds.has(app.id)
            ? {
                ...app,
                status: newStatus,
                reviewedAt: new Date().toISOString(),
                reviewedBy: 'Admin User',
              }
            : app
        )
      );
      clearSelection();
      console.log(
        `Bulk status changed to: ${newStatus} for ${selectedApplicationIds.size} selected applications.`
      );
    },
    [setApplications, selectedApplicationIds, clearSelection]
  );

  const onBulkDelete = useCallback(() => {
    console.log(
      `${selectedApplicationIds.size}개의 항목을 정말 삭제하시겠습니까?`
    );
    setApplications((prevApps) =>
      prevApps.filter((app) => !selectedApplicationIds.has(app.id))
    );
    clearSelection();
    console.log(`${selectedApplicationIds.size} applications deleted.`);
  }, [setApplications, selectedApplicationIds, clearSelection]);

  return {
    onBulkStatusChange,
    onBulkDelete,
  };
};
