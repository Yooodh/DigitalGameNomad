'use client';

// slice
import styles from '../styles/Detail.module.scss';
import { CommentListProps } from '../types';
import { formatDate } from '../../../utils/formatDate';

export default function CommentList({
  comments,
  loggedInUserKey,
  editingCommentId,
  editedCommentContent,
  setEditedCommentContent,
  handleDeleteComment,
  handleEditCommentClick,
  handleSaveEditedComment,
  handleCancelEditComment,
}: CommentListProps) {
  return (
    <div className={styles.listContainer}>
      {comments.length === 0 ? (
        <div className={styles.listContainer__noComments}>
          <p>아직 댓글이 없습니다.</p>
        </div>
      ) : (
        comments.map((comment) => (
          <div key={comment.id} className={styles.itemContainer}>
            <div className={styles.commentHeaderContainer}>
              <span className={styles.commentHeaderContainer__author}>
                {comment.userName}
              </span>
              <span className={styles.commentHeaderContainer__date}>
                {formatDate(comment.date)}{' '}
                {comment.isEdited && comment.lastModifiedDate && (
                  <span className={styles.editedIndicator}>
                    (수정됨: {formatDate(comment.lastModifiedDate)})
                  </span>
                )}
              </span>
              {comment.userKey === loggedInUserKey && (
                <div className={styles.commentActionsContainer}>
                  {editingCommentId === comment.id ? (
                    <>
                      <button
                        onClick={() => handleSaveEditedComment(comment.id)}
                        className={styles.commentActionsContainer__actionBtn}
                      >
                        저장
                      </button>
                      <button
                        onClick={handleCancelEditComment}
                        className={styles.commentActionsContainer__actionBtn}
                      >
                        취소
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditCommentClick(comment)}
                        className={styles.commentActionsContainer__btn}
                      >
                        수정
                      </button>
                      <span>|</span>
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className={styles.commentActionsContainer__btn}
                      >
                        삭제
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
            <div className={styles.itemContainer__content}>
              {editingCommentId === comment.id ? (
                <textarea
                  value={editedCommentContent}
                  onChange={(e) => setEditedCommentContent(e.target.value)}
                  rows={2}
                />
              ) : (
                comment.content
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
