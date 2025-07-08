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

export type ApplicationCardProps = {
  application: ApplicationData;
};

export type ApplicationDetailItemProps = {
  icon: React.ReactNode;
  label: string;
  value: string | null;
  className?: string;
};

export type ApplicationExternalLinkProps = {
  href: string | undefined;
  type: 'game' | 'youtube';
};

export type ApplicationSearchInputProps = {
  searchTerm: string;
  onSearchChange: (term: string) => void;
};

export type ApplicationStatusIconProps = {
  status: ApplicationData['status'];
};

export type UserApplicationsPresenterProps = {
  applications: ApplicationData[];
  searchTerm: string;
  filteredApplications: ApplicationData[];
  onSearchChange: (term: string) => void;
};
