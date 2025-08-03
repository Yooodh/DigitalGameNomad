'use client';

// slice
import styles from '../styles/Detail.module.scss';
import { CommentFormProps } from '../types';

export default function CommentForm({
  newComment,
  setNewComment,
  handleCommentSubmit,
}: CommentFormProps) {
  return (
    <form className={styles.formContainer} onSubmit={handleCommentSubmit}>
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder='댓글을 입력하세요.'
        rows={3}
        aria-label='새 댓글 입력'
      />
      <button type='submit' className={styles.formContainer__SubmitBtn}>
        등록
      </button>
    </form>
  );
}
