export type FormInputProps = {
  icon: React.ElementType;
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
  children?: React.ReactNode;
};

export type LoginSubmitButtonProps = {
  isLoading: boolean;
};

export type FormData = {
  email: string;
  password: string;
};

export type FormErrors = {
  email?: string;
  password?: string;
  general?: string;
};

export type LoginPresenterProps = {
  formData: FormData;
  errors: FormErrors;
  showPassword: boolean;
  isLoading: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  togglePasswordVisibility: () => void;
};
