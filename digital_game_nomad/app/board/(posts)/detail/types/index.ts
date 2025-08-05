import { Comment, PostData } from '@/app/board/types';

export type ActionsProps = {
  isAuthor: boolean;
  handleBackClick: () => void;
  handleEditClick: () => void;
  handleDeleteClick: () => void;
};

export type CommentFormProps = {
  newComment: string;
  setNewComment: (comment: string) => void;
  handleCommentSubmit: (e: React.FormEvent) => void;
};

export type CommentListProps = {
  comments: Comment[];
  loggedInUserKey: number;
  editingCommentId: number | null;
  editedCommentContent: string;
  setEditedCommentContent: (content: string) => void;
  handleDeleteComment: (commentId: number) => void;
  handleEditCommentClick: (comment: Comment) => void;
  handleSaveEditedComment: (commentId: number) => void;
  handleCancelEditComment: () => void;
};

export type CommentSectionProps = {
  currentPostComments: Comment[];
  newComment: string;
  setNewComment: (comment: string) => void;
  handleCommentSubmit: (e: React.FormEvent) => void;
  loggedInUserKey: number;
  editingCommentId: number | null;
  editedCommentContent: string;
  setEditedCommentContent: (content: string) => void;
  handleDeleteComment: (commentId: number) => void;
  handleEditCommentClick: (comment: Comment) => void;
  handleSaveEditedComment: (commentId: number) => void;
  handleCancelEditComment: () => void;
};

export type ContentProps = {
  postText: string;
  imageUrl: string | null | undefined;
  imageLoading: boolean;
  imageError: boolean;
  handleImageLoad: () => void;
  handleImageError: () => void;
};

export type HeaderProps = {
  currentPost: PostData;
  imageLoading: boolean;
  imageError: boolean;
};

export type InteractionProps = {
  likeCount: number;
  dislikeCount: number | undefined;
  handleLikeClick: () => void;
  handleDislikeClick: () => void;
};

export type DetailPresenterProps = {
  currentPost: PostData;
  currentPostComments: Comment[];
  newComment: string;
  setNewComment: (comment: string) => void;
  handleCommentSubmit: (e: React.FormEvent) => void;
  handleImageLoad: () => void;
  handleImageError: () => void;
  imageLoading: boolean;
  imageError: boolean;
  handleLikeClick: () => void;
  handleDislikeClick: () => void;
  handleEditClick: () => void;
  handleDeleteClick: () => void;
  handleBackClick: () => void;
  loggedInUserKey: number;
  editingCommentId: number | null;
  editedCommentContent: string;
  setEditedCommentContent: (content: string) => void;
  handleDeleteComment: (commentId: number) => void;
  handleEditCommentClick: (comment: Comment) => void;
  handleSaveEditedComment: (commentId: number) => void;
  handleCancelEditComment: () => void;
};

export type UsePostActionsProps = {
  currentPost: PostData | null;
  handleBackClick: () => void;
};
