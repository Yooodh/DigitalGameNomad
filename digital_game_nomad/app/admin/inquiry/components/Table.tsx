// slice
import styles from '../styles/AdminInquiry.module.scss';
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
            <td
              className={styles.tableRowContainer__number}
              data-label='문의번호'
            >
              {inquiry.id}
            </td>
            <td
              className={styles.tableRowContainer__title}
              onClick={() => openDetailModal(inquiry)}
              data-label='제목'
            >
              {inquiry.title}
            </td>
            <td
              className={styles.tableRowContainer__author}
              data-label='닉네임'
            >
              {inquiry.userName}
            </td>
            <td className={styles.tableRowContainer__date} data-label='등록일'>
              {inquiry.submittedAt}
            </td>
            <td className={styles.tableRowContainer__stat} data-label='상태'>
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
