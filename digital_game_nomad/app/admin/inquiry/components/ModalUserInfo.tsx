// slice
import styles from '../styles/AdminInquiry.module.scss';
import { ModalUserInfoProps } from '../types';

export default function ModalUserInfo({ selectedInquiry }: ModalUserInfoProps) {
  return (
    <div className={styles.detailSectionContainer}>
      <h3>유저 정보</h3>
      <div className={styles.gridContainer}>
        <div className={styles.detailContainer}>
          <label>닉네임:</label>
          <span>{selectedInquiry.nickName}</span>
        </div>
        <div className={styles.detailContainer}>
          <label>이름:</label>
          <span>{selectedInquiry.userName}</span>
        </div>
        <div className={styles.detailContainer}>
          <label>이메일:</label>
          <span>{selectedInquiry.senderEmail}</span>
        </div>
        {selectedInquiry.phone && (
          <div className={styles.detailContainer}>
            <label>연락처:</label>
            <span>{selectedInquiry.phone}</span>
          </div>
        )}
      </div>
    </div>
  );
}
