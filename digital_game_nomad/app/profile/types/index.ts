export type UserProfile = {
  name: string;
  nickname: string;
  email: string;
  phone: string[];
  profileImage: string;
  joinDate: string;
  grade: number;
};

export type ValidationState = {
  name: boolean;
  nickname: boolean;
  phone: boolean;
};

export type ActionProps = {
  editMode: boolean;
  isLoading: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
};

export type ProfileInfoProps = {
  profile: UserProfile;
  getGradeText: (grade: number) => string;
  getGradeIcon: (grade: number) => React.ReactNode;
  formatDate: (dateString: string) => string;
};

export type ActivityTabProps = {
  profile: UserProfile;
  formatDate: (dateString: string) => string;
  getGradeText: (grade: number) => string;
  getGradeIcon: (grade: number) => React.ReactNode;
};

export type HeaderProps = {
  profile: UserProfile;
  editMode: boolean;
  isLoading: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  getGradeText: (grade: number) => string;
  getGradeIcon: (grade: number) => React.ReactNode;
  formatDate: (dateString: string) => string;
  onCameraClick: () => void;
  onRemoveImage: () => void;
  profileImage: string | null;
};

export type InfoTabProps = {
  profile: UserProfile;
  editingProfile: UserProfile;
  editMode: boolean;
  validation: ValidationState;
  onInputChange: (
    field: keyof UserProfile,
    value: string,
    index?: number
  ) => void;
};

export type ProfileFieldProps = {
  label: string;
  icon: React.ReactNode;
  value: string;
  editingValue: string;
  editMode: boolean;
  validationError: boolean;
  errorMessage: string;
  onInputChange: (value: string) => void;
  inputType?: string;
  maxLength?: number;
  placeholder?: string;
};

export type ProfileImageProps = {
  profileImage: string | null;
  editMode: boolean;
  onCameraClick: () => void;
  onRemoveImage: () => void;
};

export type StaticProfileFieldProps = {
  label: string;
  icon: React.ReactNode;
  value: string;
  badgeText?: string;
};

export type TabsProps = {
  activeTab: string;
  onSetActiveTab: (tab: string) => void;
};

export type UseFileInputProps = {
  onFileSelect: (file: File) => void;
};

export type UseProfileFormProps = {
  editingProfile: UserProfile;
  setEditingProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  validateField: <T extends keyof UserProfile>(
    field: T,
    value: UserProfile[T]
  ) => void;
  validateAll: (profile: UserProfile) => boolean;
  handleSave: (profile: UserProfile) => Promise<void>;
  handleCancel: () => void;
  resetValidation: () => void;
};

export type UseProfileImageManagerProps = {
  editingProfile: UserProfile;
  setEditingProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  profileImage: string;
  editMode: boolean;
};

export type ProfilePresenterProps = {
  profile: UserProfile;
  editingProfile: UserProfile;
  editMode: boolean;
  activeTab: string;
  isLoading: boolean;
  validation: ValidationState;
  onInputChange: (
    field: keyof UserProfile,
    value: string,
    index?: number
  ) => void;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onSetActiveTab: (tab: string) => void;
  getGradeText: (grade: number) => string;
  formatDate: (dateString: string) => string;
  getGradeIcon: (grade: number) => React.ReactNode;
  onCameraClick: () => void;
  onRemoveImage: () => void;
  profileImage: string | null;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onFileInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
