// slice
import styles from '../styles/Detail.module.scss';
import { ModalProps } from '../types';

export default function Modal({
  selectedInquiry,
  onCloseDetailModal,
  getStatusClass,
}: ModalProps) {
  return (
    <div className={styles.overlayContainer} onClick={onCloseDetailModal}>
      <div
        className={styles.modalContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalContainer__header}>
          <h2>문의 상세</h2>
          <button className={styles.closeBtn} onClick={onCloseDetailModal}>
            ×
          </button>
        </div>

        <div className={styles.modalContainer__content}>
          <div className={styles.detailSectionContainer}>
            <div className={styles.detailSectionContainer__header}>
              <div className={styles.detailMetaContainer}>
                <span className={styles.detailMetaContainer__id}>
                  {selectedInquiry.id}
                </span>
                <span className={styles.detailMetaContainer__date}>
                  {selectedInquiry.createdAt}
                </span>
              </div>
              <span
                className={`${styles.statusBadge} ${getStatusClass(
                  selectedInquiry.status
                )}`}
              >
                {selectedInquiry.status}
              </span>
            </div>

            <h3 className={styles.detailSectionContainer__title}>
              {selectedInquiry.title}
            </h3>
            <div className={styles.detailSectionContainer__content}>
              {selectedInquiry.content}
            </div>
          </div>

          {selectedInquiry.adminReply && (
            <div className={styles.replySectionContainer}>
              <h4>관리자 답변</h4>
              <div className={styles.replySectionContainer__content}>
                {selectedInquiry.adminReply}
              </div>
              <div className={styles.replySectionContainer__date}>
                답변일: {selectedInquiry.repliedAt}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
