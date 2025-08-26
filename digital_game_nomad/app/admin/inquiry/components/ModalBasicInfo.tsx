// slice
import styles from '../styles/AdminInquiry.module.scss';
import { ModalBasicInfoProps } from '../types';

export default function ModalBasicInfo({
  selectedInquiry,
  getStatusClass,
}: ModalBasicInfoProps) {
  return (
    <div className={styles.detailSectionContainer}>
      <h3>기본 정보</h3>
      <div className={styles.gridContainer}>
        <div className={styles.detailContainer}>
          <label>문의번호:</label>
          <span>{selectedInquiry.id}</span>
        </div>
        <div className={styles.detailContainer}>
          <label>등록일시:</label>
          <span>{selectedInquiry.submittedAt}</span>
        </div>
        <div className={styles.detailContainer}>
          <label>상태:</label>
          <div
            className={`${styles.statusBadge} ${
              styles[getStatusClass(selectedInquiry.status)]
            }`}
          >
            {selectedInquiry.status}
          </div>
        </div>
      </div>
    </div>
  );
}
