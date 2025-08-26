// slice
import styles from '../styles/AdminInquiry.module.scss';
import { ModalHeaderProps } from '../types';

export default function ModalHeader({ closeDetailModal }: ModalHeaderProps) {
  return (
    <div className={styles.modalContainer__header}>
      <h2>문의 상세 정보</h2>
      <button className={styles.closeBtn} onClick={closeDetailModal}>
        ×
      </button>
    </div>
  );
}
