// slice
import AdminApplicationCardHeader from './AdminApplicationCardHeader';
import AdminApplicationContactInfo from './AdminApplicationContactInfo';
import AdminApplicationStatusAndDates from './AdminApplicationStatusAndDates';
import AdminApplicationCardActions from './AdminApplicationCardActions';
import ApplicationExternalLink from './ApplicationExternalLink';
import styles from '../styles/Applications.module.scss';
import { AdminApplicationCardProps } from '../types';

export default function AdminApplicationCard({
  application,
  isSelected,
  onToggleSelection,
  onChangeStatus,
  onView,
  onEdit,
}: AdminApplicationCardProps) {
  return (
    <div key={application.id} className={styles.gridCardContainer}>
      <AdminApplicationCardHeader
        application={application}
        isSelected={isSelected}
        onToggleSelection={onToggleSelection}
      />

      <div className={styles.gridCardContainer__subtitle}>
        {application.companyName}
      </div>

      <div className={styles.gridCardContentContainer}>
        <AdminApplicationContactInfo
          contactEmail={application.contactEmail}
          contactPhone={application.contactPhone}
        />

        <AdminApplicationStatusAndDates
          status={application.status}
          submittedAt={application.submittedAt}
          reviewedAt={application.reviewedAt}
          onChangeStatus={(newStatus) =>
            onChangeStatus(application.id, newStatus)
          }
        />

        <p className={styles.gridCardContentContainer__desc}>
          {application.description}
        </p>
      </div>

      <div className={styles.gridlinkContainer}>
        <ApplicationExternalLink href={application.gameUrl} type='game' />
        <ApplicationExternalLink href={application.youtubeUrl} type='youtube' />
      </div>

      <AdminApplicationCardActions
        application={application}
        onView={onView}
        onEdit={onEdit}
      />
    </div>
  );
}
