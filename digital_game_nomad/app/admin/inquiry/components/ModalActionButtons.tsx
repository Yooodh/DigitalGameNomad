// slice
import styles from '../styles/AdminInquiry.module.scss';
import { InquiryStatus, ModalActionButtonsProps } from '../types';

export default function ModalActionButtons({
  selectedInquiry,
  isReplyMode,
  replyContent,
  updateSelectedInquiryStatus,
  saveReply,
  toggleReplyMode,
  cancelReply,
  getStatusClass,
}: ModalActionButtonsProps & {
  updateSelectedInquiryStatus: (newStatus: InquiryStatus) => void;
}) {
  return (
    <div className={styles.actionContainer}>
      <select
        value={selectedInquiry.status}
        onChange={(e) =>
          updateSelectedInquiryStatus(e.target.value as InquiryStatus)
        }
        className={`${styles.statusSelect} ${
          styles[getStatusClass(selectedInquiry.status)]
        }`}
      >
        <option value='접수'>접수</option>
        <option value='처리중'>처리중</option>
        <option value='완료'>완료</option>
      </select>

      <div className={styles.btnWrapContainer}>
        {isReplyMode ? (
          <>
            <button
              className={styles.btnWrapContainer__cancelBtn}
              onClick={cancelReply}
            >
              취소
            </button>
            <button
              className={styles.btnWrapContainer__replyBtn}
              onClick={saveReply}
              disabled={!replyContent.trim()}
            >
              답변 저장
            </button>
          </>
        ) : (
          <button
            className={styles.btnWrapContainer__replyBtn}
            onClick={toggleReplyMode}
          >
            {selectedInquiry.reply ? '답변 수정' : '답변하기'}
          </button>
        )}
      </div>
    </div>
  );
}
