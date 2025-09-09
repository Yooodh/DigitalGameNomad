// slice
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import styles from '../styles/Detail.module.scss';
import { CommentSectionProps } from '../types';

export default function CommentSection({
  currentPostComments,
  newComment,
  setNewComment,
  handleCommentSubmit,
  loggedInUserKey,
  editingCommentId,
  editedCommentContent,
  setEditedCommentContent,
  handleDeleteComment,
  handleEditCommentClick,
  handleSaveEditedComment,
  handleCancelEditComment,
}: CommentSectionProps) {
  return (
    <div className={styles.commentContainer}>
      <h3 className={styles.titleContainer}>
        댓글{' '}
        <span className={styles.titleContainer__count}>
          ({currentPostComments.length})
        </span>
      </h3>

      <CommentForm
        newComment={newComment}
        setNewComment={setNewComment}
        handleCommentSubmit={handleCommentSubmit}
      />

      <CommentList
        comments={currentPostComments}
        loggedInUserKey={loggedInUserKey}
        editingCommentId={editingCommentId}
        editedCommentContent={editedCommentContent}
        setEditedCommentContent={setEditedCommentContent}
        handleDeleteComment={handleDeleteComment}
        handleEditCommentClick={handleEditCommentClick}
        handleSaveEditedComment={handleSaveEditedComment}
        handleCancelEditComment={handleCancelEditComment}
      />
    </div>
  );
}
