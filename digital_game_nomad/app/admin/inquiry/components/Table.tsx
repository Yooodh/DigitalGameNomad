// slice
import styles from '../styles/Inquiry.module.scss';
import { InquiryStatus, TableProps } from '../types';

export default function Table({
  currentInquiries,
  openDetailModal,
  updateInquiryStatus,
  getStatusClass,
}: TableProps) {
  return (
    <table className={styles.tableContainer}>
      <thead className={styles.tableHeaderContainer}>
        <tr>
          <th className={styles.tableHeaderContainer__number}>문의번호</th>
          <th className={styles.tableHeaderContainer__title}>제목</th>
          <th className={styles.tableHeaderContainer__author}>작성자</th>
          <th className={styles.tableHeaderContainer__date}>등록일</th>
          <th className={styles.tableHeaderContainer__stat}>상태</th>
        </tr>
      </thead>

      <tbody>
        {currentInquiries.map((inquiry) => (
          <tr key={inquiry.id} className={styles.tableRowContainer}>
            <td className={styles.tableRowContainer__number}>{inquiry.id}</td>
            <td
              className={styles.tableRowContainer__title}
              onClick={() => openDetailModal(inquiry)}
            >
              {inquiry.title}
            </td>
            <td className={styles.tableRowContainer__author}>
              {inquiry.userName}
            </td>
            <td className={styles.tableRowContainer__date}>
              {inquiry.createdAt}
            </td>
            <td className={styles.tableRowContainer__stat}>
              <select
                value={inquiry.status}
                onChange={(e) =>
                  updateInquiryStatus(
                    inquiry.id,
                    e.target.value as InquiryStatus
                  )
                }
                className={`${styles.statusSelect} ${
                  styles[getStatusClass(inquiry.status)]
                }`}
              >
                <option value='접수'>접수</option>
                <option value='처리중'>처리중</option>
                <option value='완료'>완료</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
