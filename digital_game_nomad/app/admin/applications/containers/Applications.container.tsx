'use client';

// slice
import AdminApplicationsPresenter from '../presenters/Applications.presenter';
import { useAdminApplications } from '../hooks/useAdminApplications';
import { AdminApplicationsContainerProps } from '../types';
import { MOCK_APPLICATIONS } from '../data';

export default function AdminApplicationsContainer({
  onView,
  onEdit,
  onExport,
}: AdminApplicationsContainerProps) {
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
  } = useAdminApplications(MOCK_APPLICATIONS);

  return (
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
      onView={onView}
      onEdit={onEdit}
      getStatusCount={getStatusCount}
    />
  );
}
