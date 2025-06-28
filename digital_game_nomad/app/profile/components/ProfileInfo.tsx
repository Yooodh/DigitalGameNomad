// slice
import styles from '../styles/Profile.module.scss';
import { ProfileInfoProps } from '../types';

// layer
import { Calendar } from '@/shared/icons';

export default function ProfileInfo({
  profile,
  getGradeText,
  getGradeIcon,
  formatDate,
}: ProfileInfoProps) {
  return (
    <div className={styles.infoContainer}>
      <h2 className={styles.infoContainer__name}>{profile.name}</h2>
      <p className={styles.infoContainer__nickname}>@{profile.nickname}</p>
      <div className={styles.infoContainer__stats}>
        <div className={styles.infoContainer__stat}>
          <Calendar />
          <span>가입일: {formatDate(profile.joinDate)}</span>
        </div>
      </div>

      <div className={styles.infoContainer__stat}>
        {getGradeIcon(profile.grade)}
        <span>회원 등급: {getGradeText(profile.grade)}</span>
      </div>
    </div>
  );
}
