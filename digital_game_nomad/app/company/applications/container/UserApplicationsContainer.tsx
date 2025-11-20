'use client';

// package
import { useMemo } from 'react';

// slice
import UserApplicationsPresenter from '../presenter/UserApplicationsPresenter';
import { useApplicationsFilter } from '../hooks/useApplicationsFilter';

// layer
import { Loading } from '@/features/loading';
import { useApplicationsStore } from '@/shared/stores/useApplicationsStore';
import { useAuthStore } from '@/shared/stores/useAuthStore';

export default function UserApplicationsContainer() {
  const allApplications = useApplicationsStore((state) => state.applications);
  const { userEmail: currentUserEmail } = useAuthStore();

  const myApplications = useMemo(() => {
    if (!currentUserEmail) return [];
    return allApplications.filter(
      (app) => app.applicantEmail === currentUserEmail
    );
  }, [allApplications, currentUserEmail]);

  const { searchTerm, filteredApplications, onSearchChange } =
    useApplicationsFilter(myApplications);

  return (
    <Loading message='신청 내역 불러오는 중...'>
      <UserApplicationsPresenter
        searchTerm={searchTerm}
        filteredApplications={filteredApplications}
        onSearchChange={onSearchChange}
      />
    </Loading>
  );
}
