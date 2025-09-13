export type FormData = {
  companyName: string;
  gameName: string;
  description: string;
  gameUrl: string;
  youtubeUrl: string;
};

export type UrlFormData = Pick<FormData, 'gameUrl' | 'youtubeUrl'>;

export type UseFormSubmissionProps<T> = {
  validate: (data: T) => boolean;
  onSubmitSuccess?: (data: T) => void | Promise<void>;
  submissionEndpoint?: string;
};

export type UrlInputProps = {
  formData: UrlFormData;
  onInputChange: (field: keyof UrlFormData, value: string) => void;
};

export type ImageUploadProps = {
  previewImage: string;
  isDragging: boolean;
  onImageChange: (file: File) => void;
  onRemoveImage: () => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
};

export interface InputFieldProps {
  label: string;
  icon: React.ReactNode;
  type?: 'text' | 'textarea' | 'url' | 'email' | 'password';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  inputClassName?: string;
  iconClassName?: string;
  isRequired?: boolean;
}

export type SubmitButtonProps = {
  onSubmit: () => void;
};

export type ApplyContainerProps = {
  onSubmit?: (data: FormData & { image?: File }) => void;
};

export type ApplyPresenterProps = {
  formData: FormData;
  previewImage: string;
  isDragging: boolean;
  onInputChange: (field: keyof FormData, value: string) => void;
  onImageChange: (file: File) => void;
  onRemoveImage: () => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  onSubmit: () => void;
};
