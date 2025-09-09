// slice
import styles from '../styles/Detail.module.scss';
import { CommentListProps } from '../types';
import { formatDate } from '../../../utils/formatDate';

// layer
import { useRegisteredUsersStore } from '@/shared/stores/useRegisteredUsersStore';
import { getUserGradeLabel } from '@/shared/utils/userGradeLabel';

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
  const users = useRegisteredUsersStore((state) => state.users);

  return (
    <div className={styles.listContainer}>
      {comments.length === 0 ? (
        <div className={styles.listContainer__noComments}>
          <p>아직 댓글이 없습니다.</p>
        </div>
      ) : (
        comments.map((comment) => {
          const author = users.find((u) => u.id === comment.userKey);
          const displayName = author?.nickname || author?.name || '알수없음';

          return (
            <div key={comment.id} className={styles.itemContainer}>
              <div className={styles.commentHeaderContainer}>
                <span className={styles.commentHeaderContainer__author}>
                  {displayName}

                  {author && author.userGrade !== 3 && (
                    <span className={styles.userGrade}>
                      &nbsp;({getUserGradeLabel(author.userGrade)})
                    </span>
                  )}
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
          );
        })
      )}
    </div>
  );
}
