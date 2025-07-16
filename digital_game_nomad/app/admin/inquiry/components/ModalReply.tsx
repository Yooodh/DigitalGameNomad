// slice
import styles from '../styles/Inquiry.module.scss';
import { ModalReplyProps } from '../types';

export default function ModalReply({
  selectedInquiry,
  isReplyMode,
  replyContent,
  setReplyContent,
}: ModalReplyProps) {
  return (
    <div className={styles.detailSectionContainer}>
      <h3>답변 정보</h3>
      {isReplyMode ? (
        <>
          <div className={styles.detailContainer}>
            <label>내용:</label>
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder='답변을 입력해주세요...'
              rows={8}
            />
          </div>
        </>
      ) : (
        selectedInquiry.reply && (
          <>
            <div className={styles.replyContainer}>
              <label>내용:</label>
              <div className={styles.replyContainer__content}>
                {selectedInquiry.reply}
              </div>
            </div>
            <div className={styles.detailContainer}>
              <label>답변 일시:</label>
              <span>{selectedInquiry.replyDate}</span>
            </div>
          </>
        )
      )}
    </div>
  );
}
