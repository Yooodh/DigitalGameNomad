import { PostData } from '@/app/board/types';
import { TypeAndGameProps } from '../../types';

export type ActionBtnsProps = {
  saving: boolean;
  handleCancel: () => void;
};

export type BadgeProps = {
  topic: '자유' | '후기';
};

export type PostEditProps = {
  postId: string;
  onSave?: (postData: PostData) => void;
  onCancel?: () => void;
};

export type UseEditFormProps = {
  postId: string;
  onSave?: (postData: PostData) => void;
  onCancel?: () => void;
};

export type EditPresenterProps = {
  title: string;
  setTitle: (title: string) => void;
  content: string;
  setContent: (content: string) => void;
  topic: '자유' | '후기';
  currentImageUrl: string;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveImage: () => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleCancel: () => void;
  saving: boolean;
  isReviewMode: boolean;
  typeAndGameProps: TypeAndGameProps;
};
