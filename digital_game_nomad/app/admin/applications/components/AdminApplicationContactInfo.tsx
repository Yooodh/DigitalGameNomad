// slice
import ApplicationDetailItem from './ApplicationDetailItem';
import styles from '../styles/Applications.module.scss';
import { AdminApplicationContactInfoProps } from '../types';

// layer
import { Mail, Phone } from '@/shared/icons';

export default function AdminApplicationContactInfo({
  contactEmail,
  contactPhone,
}: AdminApplicationContactInfoProps) {
  return (
    <>
      <ApplicationDetailItem
        icon={<Mail />}
        label='이메일'
        value={
          <a
            href={`mailto:${contactEmail}`}
            className={styles.gridCardSectionContainer__link}
          >
            {contactEmail}
          </a>
        }
      />
      <ApplicationDetailItem
        icon={<Phone />}
        label='전화번호'
        value={
          <a
            href={`tel:${contactPhone}`}
            className={styles.gridCardSectionContainer__link}
          >
            {contactPhone}
          </a>
        }
      />
    </>
  );
}
