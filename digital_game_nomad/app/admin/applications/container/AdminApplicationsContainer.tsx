'use client';

// slice
import AdminApplicationsPresenter from '../presenter/AdminApplicationsPresenter';
import { useAdminApplications } from '../hooks/useAdminApplications';

// layer
import { Loading } from '@/features/loading';

export default function AdminApplicationsContainer() {
  const {
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
  } = useAdminApplications();

  return (
    <Loading message='신청 내역 불러오는 중...'>
      <AdminApplicationsPresenter
        applications={applications}
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        sortBy={sortBy}
        sortOrder={sortOrder}
        filteredApplications={filteredApplications}
        selectedApplications={selectedApplications}
        showBulkActions={showBulkActions}
        onSearchChange={onSearchChange}
        onStatusFilterChange={onStatusFilterChange}
        onResetFilters={onResetFilters}
        onToggleSort={onToggleSort}
        onToggleApplicationSelection={onToggleApplicationSelection}
        onSelectAllApplications={onSelectAllApplications}
        onBulkStatusChange={onBulkStatusChange}
        onBulkDelete={onBulkDelete}
        onChangeStatus={onChangeStatus}
        getStatusCount={getStatusCount}
      />
    </Loading>
  );
}
