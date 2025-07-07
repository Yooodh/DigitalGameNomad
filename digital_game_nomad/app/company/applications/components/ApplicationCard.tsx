// slice
import ApplicationStatusIcon from './ApplicationStatusIcon';
import ApplicationDetailItem from './ApplicationDetailItem';
import ApplicationExternalLink from './ApplicationExternalLink';
import styles from '../styles/Applications.module.scss';
import { ApplicationCardProps } from '../types';
import { formatDate } from '../utils/dateFormatter';

// layer (
import { Calendar, Mail, Phone, Clock } from '@/shared/icons';

export default function ApplicationCard({ application }: ApplicationCardProps) {
  const statusClassName =
    styles[
      `status${
        application.status.charAt(0).toUpperCase() + application.status.slice(1)
      }`
    ];

  return (
    <div className={styles.gridCardContainer}>
      <div className={styles.gridCardHeaderContainer}>
        <div className={styles.gridCardHeaderContainer__title}>
          {application.gameName}
        </div>
      </div>

      <div className={styles.gridCardContainer__subtitle}>
        {application.companyName}
      </div>

      <div className={styles.gridCardContentContainer}>
        <ApplicationDetailItem
          icon={<Mail />}
          label='이메일'
          value={application.contactEmail}
        />
        <ApplicationDetailItem
          icon={<Phone />}
          label='전화번호'
          value={application.contactPhone}
        />
        <ApplicationDetailItem
          icon={<ApplicationStatusIcon status={application.status} />}
          label='상태'
          value={
            application.status === 'pending'
              ? '검토 대기'
              : application.status === 'approved'
              ? '승인됨'
              : application.status === 'rejected'
              ? '거부됨'
              : ''
          }
          className={`${styles.status} ${statusClassName}`}
        />
        <ApplicationDetailItem
          icon={<Calendar />}
          label='신청일'
          value={formatDate(application.submittedAt)}
        />
        {application.reviewedAt && (
          <ApplicationDetailItem
            icon={<Clock />}
            label='검토일'
            value={formatDate(application.reviewedAt)}
          />
        )}

        <p className={styles.gridCardContentContainer__desc}>
          {application.description}
        </p>
      </div>
      <div className={styles.gridlinkContainer}>
        <ApplicationExternalLink href={application.gameUrl} type='game' />
        <ApplicationExternalLink href={application.youtubeUrl} type='youtube' />
      </div>
    </div>
  );
}
