'use client';

// slice
import AdminStatsDashboard from '../components/AdminStatsDashboard';
import AdminApplicationsFilters from '../components/AdminApplicationsFilters';
import AdminBulkActions from '../components/AdminBulkActions';
import AdminApplicationCard from '../components/AdminApplicationCard';
import EmptyApplicationsMessage from '../components/EmptyApplicationsMessage';
import styles from '../styles/Applications.module.scss';
import { AdminApplicationsPresenterProps } from '../types';

export default function AdminApplicationsPresenter({
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
  onView,
  onEdit,
  getStatusCount,
}: AdminApplicationsPresenterProps) {
  return (
    <div className={styles.applicationsContainer}>
      <div className={styles.applicationsContainer__wrap}>
        <AdminStatsDashboard
          totalApplications={applications.length}
          pendingCount={getStatusCount('pending')}
          approvedCount={getStatusCount('approved')}
          rejectedCount={getStatusCount('rejected')}
        />

        <AdminApplicationsFilters
          searchTerm={searchTerm}
          statusFilter={statusFilter}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSearchChange={onSearchChange}
          onStatusFilterChange={onStatusFilterChange}
          onResetFilters={onResetFilters}
          onToggleSort={onToggleSort}
        />

        {showBulkActions && (
          <AdminBulkActions
            selectedCount={selectedApplications.size}
            totalFilteredCount={filteredApplications.length}
            onSelectAll={onSelectAllApplications}
            onBulkStatusChange={onBulkStatusChange}
            onBulkDelete={onBulkDelete}
          />
        )}

        {filteredApplications.length === 0 ? (
          <EmptyApplicationsMessage />
        ) : (
          <div className={styles.gridContainer}>
            {filteredApplications.map((application) => (
              <AdminApplicationCard
                key={application.id}
                application={application}
                isSelected={selectedApplications.has(application.id)}
                onToggleSelection={onToggleApplicationSelection}
                onChangeStatus={onChangeStatus}
                onView={onView}
                onEdit={onEdit}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
