export type ApplicationData = {
  id: string;
  companyName: string;
  gameName: string;
  description: string;
  gameUrl: string;
  youtubeUrl: string;
  image?: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  contactEmail: string;
  contactPhone: string;
  reviewedAt?: string;
  reviewedBy?: string;
  notes?: string;
};

export type StatusFilter = 'all' | 'pending' | 'approved' | 'rejected';
export type SortField = 'date' | 'name' | 'status';
export type SortOrder = 'asc' | 'desc';

export type AdminApplicationCardProps = {
  application: ApplicationData;
  isSelected: boolean;
  onToggleSelection: (id: string) => void;
  onChangeStatus: (id: string, newStatus: ApplicationData['status']) => void;
  onView?: (application: ApplicationData) => void;
  onEdit?: (application: ApplicationData) => void;
};

export type AdminApplicationCardActionsProps = {
  application: ApplicationData;
  onView?: (application: ApplicationData) => void;
  onEdit?: (application: ApplicationData) => void;
};

export type AdminApplicationCardHeaderProps = {
  application: ApplicationData;
  isSelected: boolean;
  onToggleSelection: (id: string) => void;
};

export type AdminApplicationContactInfoProps = {
  contactEmail: string;
  contactPhone: string;
};

export type AdminApplicationsFiltersProps = {
  searchTerm: string;
  statusFilter: StatusFilter;
  sortBy: SortField;
  sortOrder: SortOrder;
  onSearchChange: (term: string) => void;
  onStatusFilterChange: (status: StatusFilter) => void;
  onResetFilters: () => void;
  onToggleSort: (field: SortField) => void;
};

export type AdminApplicationStatusAndDatesProps = {
  status: ApplicationData['status'];
  submittedAt: string;
  reviewedAt?: string;
  onChangeStatus: (newStatus: ApplicationData['status']) => void;
};

export type AdminBulkActionsProps = {
  selectedCount: number;
  totalFilteredCount: number;
  onSelectAll: () => void;
  onBulkStatusChange: (status: 'approved' | 'rejected') => void;
  onBulkDelete: () => void;
};

export type AdminStatsDashboardProps = {
  totalApplications: number;
  pendingCount: number;
  approvedCount: number;
  rejectedCount: number;
};

export type ApplicationDetailItemProps = {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  className?: string;
};

export type ApplicationExternalLinkProps = {
  href: string | undefined;
  type: 'game' | 'youtube';
};

export type ApplicationStatusIconProps = {
  status: ApplicationData['status'];
};

export type SearchInputProps = {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  placeholder?: string;
};

export type SortButtonsProps = {
  sortBy: SortField;
  sortOrder: SortOrder;
  onToggleSort: (field: SortField) => void;
};

export type StatusFilterDropdownProps = {
  statusFilter: StatusFilter;
  onStatusFilterChange: (status: StatusFilter) => void;
};

export type AdminApplicationsContainerProps = {
  onView?: (application: ApplicationData) => void;
  onEdit?: (application: ApplicationData) => void;
  onExport?: () => void;
};

export type SetApplicationsFunction = React.Dispatch<
  React.SetStateAction<ApplicationData[]>
>;
export type ClearSelectionFunction = () => void;

export type AdminApplicationsPresenterProps = {
  applications: ApplicationData[];
  searchTerm: string;
  statusFilter: 'all' | 'pending' | 'approved' | 'rejected';
  sortBy: 'date' | 'name' | 'status';
  sortOrder: 'asc' | 'desc';
  filteredApplications: ApplicationData[];
  selectedApplications: Set<string>;
  showBulkActions: boolean;
  onSearchChange: (term: string) => void;
  onStatusFilterChange: (
    status: 'all' | 'pending' | 'approved' | 'rejected'
  ) => void;
  onResetFilters: () => void;
  onToggleSort: (field: 'date' | 'name' | 'status') => void;
  onToggleApplicationSelection: (id: string) => void;
  onSelectAllApplications: () => void;
  onBulkStatusChange: (status: ApplicationData['status']) => void;
  onBulkDelete: () => void;
  onChangeStatus: (id: string, newStatus: ApplicationData['status']) => void;
  onView?: (application: ApplicationData) => void;
  onEdit?: (application: ApplicationData) => void;
  getStatusCount: (status: ApplicationData['status']) => number;
};
