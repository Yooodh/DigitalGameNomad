import { TypeAndGameProps } from '../../types';

export type SubmitBtnProps = {
  isReviewMode: boolean;
};

export type WritePresenterProps = {
  titleValue: string;
  handleTitleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  contentValue: string;
  handleContentChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  currentImageUrl: string;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveImage: (e: React.MouseEvent<HTMLButtonElement>) => void;
  typeAndGameProps: TypeAndGameProps;
  handleSubmit: (e: React.FormEvent) => void;
};
