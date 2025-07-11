// package
import { useState, useCallback } from 'react';

// slice
import { ApplicationData } from '../types';

export const useApplicationData = (initialApplications: ApplicationData[]) => {
  const [applications, setApplications] =
    useState<ApplicationData[]>(initialApplications);

  const onChangeStatus = useCallback(
    (id: string, newStatus: ApplicationData['status']) => {
      setApplications((prevApps) =>
        prevApps.map((app) =>
          app.id === id
            ? {
                ...app,
                status: newStatus,
                reviewedAt:
                  newStatus !== 'pending'
                    ? new Date().toISOString()
                    : undefined,
                reviewedBy: newStatus !== 'pending' ? 'Admin User' : undefined,
              }
            : app
        )
      );
      console.log(`Application ${id} status changed to: ${newStatus}`);
    },
    []
  );

  const getStatusCount = useCallback(
    (status: ApplicationData['status']) => {
      return applications.filter((app) => app.status === status).length;
    },
    [applications]
  );

  return {
    applications,
    setApplications,
    onChangeStatus,
    getStatusCount,
  };
};
