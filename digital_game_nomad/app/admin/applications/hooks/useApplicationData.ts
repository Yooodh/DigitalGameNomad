// package
import { useCallback } from 'react';

// slice
import { ApplicationData } from '../types';

// layer
import { useApplicationsStore } from '@/shared/stores/useApplicationsStore';

export const useApplicationData = () => {
  const applications = useApplicationsStore((state) => state.applications);
  const updateApplicationStatus = useApplicationsStore(
    (state) => state.updateApplicationStatus
  );

  const onChangeStatus = useCallback(
    (id: string, newStatus: ApplicationData['status']) => {
      updateApplicationStatus(id, newStatus);
    },
    [updateApplicationStatus]
  );

  const getStatusCount = useCallback(
    (status: ApplicationData['status']) => {
      return applications.filter((app) => app.status === status).length;
    },
    [applications]
  );

  return {
    applications,
    onChangeStatus,
    getStatusCount,
  };
};
