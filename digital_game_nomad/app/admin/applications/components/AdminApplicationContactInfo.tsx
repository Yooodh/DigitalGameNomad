// slice
import ApplicationDetailItem from './ApplicationDetailItem';
import styles from '../styles/AdminApplications.module.scss';
import { AdminApplicationContactInfoProps } from '../types';

// layer
import { Mail, Phone, User } from '@/shared/icons';
import { useRegisteredUsersStore } from '@/shared/stores/useRegisteredUsersStore';

export default function AdminApplicationContactInfo({
  applicantEmail,
}: AdminApplicationContactInfoProps) {
  const users = useRegisteredUsersStore((state) => state.users);
  const applicant = users.find((user) => user.email === applicantEmail);

  const formatPhoneNumber = (phone?: [string, string, string, string]) => {
    if (!phone || !phone[1] || !phone[2] || !phone[3]) return undefined;
    return `${phone[1]}-${phone[2]}-${phone[3]}`;
  };

  const userPhone = formatPhoneNumber(applicant?.phone);
  const userName = applicant?.name;

  return (
    <>
      {userName && (
        <ApplicationDetailItem icon={<User />} label='이름' value={userName} />
      )}
      <ApplicationDetailItem
        icon={<Mail />}
        label='이메일'
        value={
          <a
            href={`mailto:${applicantEmail}`}
            className={styles.gridCardSectionContainer__link}
          >
            {applicantEmail}
          </a>
        }
      />
      {userPhone && (
        <ApplicationDetailItem
          icon={<Phone />}
          label='전화번호'
          value={
            <a
              href={`tel:${userPhone}`}
              className={styles.gridCardSectionContainer__link}
            >
              {userPhone}
            </a>
          }
        />
      )}
    </>
  );
}
