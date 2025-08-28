'use client';

// slice
import AdminApplicationsPresenter from '../presenter/AdminApplicationsPresenter';
import { useAdminApplications } from '../hooks/useAdminApplications';

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
  );
}
