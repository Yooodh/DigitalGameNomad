export type FormInputProps = {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
};

export type FormTextareaProps = {
  id: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  rows?: number;
};

export type HeaderProps = {
  title: string;
  subTitle?: string;
};

export type SubmitButtonProps = {
  isSubmitting: boolean;
  onClick: () => void;
  label: string;
  submittingLabel?: string;
};

export type QuestionData = {
  title: string;
  text: string;
};

export type UseInquirySubmissionReturn = {
  formData: QuestionData;
  errors: Partial<QuestionData>;
  isSubmitting: boolean;
  handleInputChange: (field: keyof QuestionData, value: string) => void;
  submitQuestion: () => Promise<void>;
};

export type InquiryPresenterProps = {
  formData: QuestionData;
  errors: Partial<QuestionData>;
  isSubmitting: boolean;
  handleInputChange: (field: keyof QuestionData, value: string) => void;
  submitQuestion: () => void;
};
