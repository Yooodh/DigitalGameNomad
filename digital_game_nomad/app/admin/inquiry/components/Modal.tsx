// slice
import ModalHeader from '../components/ModalHeader';
import ModalBasicInfo from '../components/ModalBasicInfo';
import ModalUserInfo from '../components//ModalUserInfo';
import ModalContent from '../components/ModalContent';
import ModalReply from '../components/ModalReply';
import ModalActionButtons from '../components/ModalActionButtons';
import styles from '../styles/Inquiry.module.scss';
import { ModalProps } from '../types';

export default function ({
  selectedInquiry,
  isReplyMode,
  replyContent,
  closeDetailModal,
  updateInquiryStatus,
  setReplyContent,
  saveReply,
  toggleReplyMode,
  cancelReply,
  getStatusClass,
}: ModalProps) {
  return (
    <div className={styles.overlayContainer} onClick={closeDetailModal}>
      <div
        className={styles.modalContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader closeDetailModal={closeDetailModal} />

        <div className={styles.modalContainer__content}>
          <ModalBasicInfo
            selectedInquiry={selectedInquiry}
            getStatusClass={getStatusClass}
          />

          <ModalUserInfo selectedInquiry={selectedInquiry} />

          <ModalContent selectedInquiry={selectedInquiry} />

          <ModalReply
            selectedInquiry={selectedInquiry}
            isReplyMode={isReplyMode}
            replyContent={replyContent}
            setReplyContent={setReplyContent}
          />

          <ModalActionButtons
            selectedInquiry={selectedInquiry}
            isReplyMode={isReplyMode}
            replyContent={replyContent}
            updateInquiryStatus={updateInquiryStatus}
            saveReply={saveReply}
            toggleReplyMode={toggleReplyMode}
            cancelReply={cancelReply}
            getStatusClass={getStatusClass}
          />
        </div>
      </div>
    </div>
  );
}
