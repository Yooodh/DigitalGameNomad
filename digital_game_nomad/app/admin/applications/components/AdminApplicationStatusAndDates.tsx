// slice
import ApplicationDetailItem from './ApplicationDetailItem';
import ApplicationStatusIcon from './ApplicationStatusIcon';
import styles from '../styles/AdminApplications.module.scss';
import { ApplicationData, AdminApplicationStatusAndDatesProps } from '../types';
import { formatDate } from '../utils';

// layer
import { Calendar, Clock } from '@/shared/icons';

export default function AdminApplicationStatusAndDates({
  status,
  submittedAt,
  reviewedAt,
  onChangeStatus,
}: AdminApplicationStatusAndDatesProps) {
  const statusClassName =
    styles[`status${status.charAt(0).toUpperCase() + status.slice(1)}`];

  return (
    <>
      <div
        className={`${styles.gridCardSectionContainer} ${styles.status} ${statusClassName}`}
      >
        <span className={styles.gridCardSectionContainer__icon}>
          <ApplicationStatusIcon status={status} />
        </span>
        상태:
        <select
          value={status}
          onChange={(e) =>
            onChangeStatus(e.target.value as ApplicationData['status'])
          }
          className={styles.statusSelect}
        >
          <option value='pending'>검토</option>
          <option value='approved'>승인</option>
          <option value='rejected'>거부</option>
        </select>
      </div>
      <ApplicationDetailItem
        icon={<Calendar />}
        label='신청일'
        value={formatDate(submittedAt)}
      />
      {reviewedAt && (
        <ApplicationDetailItem
          icon={<Clock />}
          label='검토일'
          value={formatDate(reviewedAt)}
        />
      )}
    </>
  );
}
