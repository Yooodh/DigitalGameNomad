// slice
import styles from '../styles/Inquiry.module.scss';
import { ModalContentProps } from '../types';

export default function ModalContent({ selectedInquiry }: ModalContentProps) {
  return (
    <div className={styles.detailSectionContainer}>
      <h3>문의 내용</h3>
      <div className={styles.replyContainer}>
        <label>제목:</label>
        <div className={styles.replyContainer__content}>
          {selectedInquiry.title}
        </div>
      </div>
      <div className={styles.replyContainer}>
        <label>내용:</label>
        <div className={styles.replyContainer__content}>
          {selectedInquiry.content}
        </div>
      </div>
    </div>
  );
}
