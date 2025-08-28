// slice
import styles from '../styles/AdminApplications.module.scss';
import { ApplicationStatusIconProps } from '../types';

// layer
import { CheckCircle, XCircle, Clock, AlertCircle } from '@/shared/icons';

export default function ApplicationStatusIcon({
  status,
}: ApplicationStatusIconProps) {
  switch (status) {
    case 'approved':
      return (
        <span className={styles.statusIconApproved}>
          <CheckCircle />
        </span>
      );
    case 'rejected':
      return (
        <span className={styles.statusIconRejected}>
          <XCircle />
        </span>
      );
    case 'pending':
      return (
        <span className={styles.statusIconPending}>
          <Clock />
        </span>
      );
    default:
      return (
        <span className={styles.statusIconDefault}>
          <AlertCircle />
        </span>
      );
  }
}
