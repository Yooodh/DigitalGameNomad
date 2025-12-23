export type UserData = {
  id: string;
  name: string;
  nickname: string;
  email: string;
  phone: [string, string, string, string];
  userLevel: number;
  joinDate: string;
  deleteDate?: string;
  isSelected?: boolean;
  lastLoginDate?: string;
};

export type UserSortField = 'name' | 'joinDate' | 'lastLoginDate';
export type SortOrder = 'asc' | 'desc';
export type FilterLevel = number | 'all';

export type UserManagementState = {
  users: UserData[];
};

export type FilteringState = {
  searchTerm: string;
  filterLevel: FilterLevel;
  showDeletedUsers: boolean;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setFilterLevel: React.Dispatch<React.SetStateAction<FilterLevel>>;
  setShowDeletedUsers: React.Dispatch<React.SetStateAction<boolean>>;
};

export type SortingState = {
  sortBy: UserSortField;
  sortOrder: SortOrder;
  setSortBy: React.Dispatch<React.SetStateAction<UserSortField>>;
  setSortOrder: React.Dispatch<React.SetStateAction<SortOrder>>;
};

export type PaginationState = {
  currentPage: number;
  itemsPerPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export type SelectionState = {
  selectedUserIds: Set<string>;
  setSelectedUserIds: React.Dispatch<React.SetStateAction<Set<string>>>;
};

export type UsersPresenterProps = {
  users: UserData[];
  searchTerm: string;
  filterLevel: FilterLevel;
  showDeletedUsers: boolean;
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  sortBy: UserSortField;
  sortOrder: SortOrder;
  totalActiveUsers: number;
  totalBusinessUsers: number;
  totalGeneralUsers: number;
  totalDeletedUsers: number;
  overallTotalUsers: number;
  totalFilteredAndSortedUsersCount: number;
  selectedUserIds: Set<string>;
  isAllSelectedOnPage: boolean;
  handleSearchChange: (value: string) => void;
  handleFilterChange: (value: FilterLevel) => void;
  handleDeletedToggle: (checked: boolean) => void;
  handleSortChange: (field: UserSortField) => void;
  handlePageChange: (page: number) => void;
  handlePasswordReset: (userId: string, userName: string) => void;
  handleUserRestore: (userId: string, userName: string) => void;
  handleResetFilters: () => void;
  getUserLevelText: (level: number) => string;
  getUserLevelClass: (level: number) => string;
  generatePageNumbers: () => (number | string)[];
  handleUserSelect: (userId: string, isSelected: boolean) => void;
  handleSelectAll: (checked: boolean) => void;
  handleDeleteSelectedUsers: () => void;
  handleCancelSelection: () => void;
  handleHardDeleteUser: (userId: string, userName: string) => void;
};

export type Props = UsersPresenterProps & {
  handleCancelSelection: () => void;
  handleHardDeleteUser: (userId: string, userName: string) => void;
};

export type TableProps = {
  users: UserData[];
  selectedUserIds: Set<string>;
  isAllSelectedOnPage: boolean;
  handleUserSelect: (userId: string, isSelected: boolean) => void;
  handleSelectAll: (checked: boolean) => void;
  handlePasswordReset: (userId: string, userName: string) => void;
  handleUserRestore: (userId: string, userName: string) => void;
  handleDeleteSelectedUsers: () => void;
  handleCancelSelection: () => void;
  handleHardDeleteUser: (userId: string, userName: string) => void;
  getUserLevelText: (level: number) => string;
  getUserLevelClass: (level: number) => string;
} & PaginationProps;

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  totalFilteredAndSortedUsersCount: number;
  handlePageChange: (page: number) => void;
  generatePageNumbers: () => (number | string)[];
};

export type FiltersAndSortProps = {
  searchTerm: string;
  filterLevel: FilterLevel;
  showDeletedUsers: boolean;
  sortBy: UserSortField;
  handleSearchChange: (term: string) => void;
  handleFilterChange: (level: FilterLevel) => void;
  handleDeletedToggle: (checked: boolean) => void;
  handleSortChange: (criteria: UserSortField) => void;
  handleResetFilters: () => void;
};

export type StatsCardsProps = {
  totalActiveUsers: number;
  totalBusinessUsers: number;
  totalGeneralUsers: number;
  totalDeletedUsers: number;
  overallTotalUsers: number;
};

export type TableHeaderProps = {
  isAllSelectedOnPage: boolean;
  handleSelectAll: (checked: boolean) => void;
};

export type TableRowProps = {
  user: UserData;
  handleUserSelect: (userId: string, isSelected: boolean) => void;
  handlePasswordReset: (userId: string, userName: string) => void;
  handleUserRestore: (userId: string, userName: string) => void;
  handleHardDeleteUser: (userId: string, userName: string) => void;
  getUserLevelText: (level: number) => string;
  getUserLevelClass: (level: number) => string;
};

export type TableRowActionCellProps = {
  user: Pick<UserData, 'id' | 'name' | 'deleteDate'>;
  handlePasswordReset: (userId: string, userName: string) => void;
  handleUserRestore: (userId: string, userName: string) => void;
};

export type FilterSearchInputProps = {
  searchTerm: string;
  handleSearchChange: (term: string) => void;
};

export type FilterLevelSelectProps = {
  filterLevel: FilterLevel;
  handleFilterChange: (level: FilterLevel) => void;
};

export type SortButtonsProps = {
  sortBy: UserSortField;
  handleSortChange: (criteria: UserSortField) => void;
};

export type FilterResetButtonProps = {
  handleResetFilters: () => void;
};

export type ShowDeletedUsersToggleProps = {
  showDeletedUsers: boolean;
  handleDeletedToggle: (checked: boolean) => void;
};
