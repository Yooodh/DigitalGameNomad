// package
import Link from 'next/link';

// slice
import styles from '../styles/Profile.module.scss';
import { ActivityTabProps } from '../types';

export default function ActivityTab({
  profile,
  formatDate,
  getGradeText,
  getGradeIcon,
}: ActivityTabProps) {
  return (
    <div className={styles.activeContainer}>
      <div className={styles.activeCardContainer}>
        <h3 className={styles.activeCardContainer__title}>계정 활동</h3>
        <div className={styles.activeCardContainer__item}>
          <div className={styles.activeCardContainer__label}>가입일</div>
          <div className={styles.activeCardContainer__value}>
            {formatDate(profile.joinDate)}
          </div>
        </div>
        <div className={styles.activeCardContainer__item}>
          <div className={styles.activeCardContainer__label}>회원 등급</div>
          <div className={styles.activeCardContainer__value}>
            <span className={styles.activeCardContainer__gradeInfo}>
              {getGradeIcon(profile.grade)}
              {getGradeText(profile.grade)}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.activeCardContainer}>
        <h3 className={styles.activeCardContainer__title}>보안 설정</h3>
        <div className={styles.activeCardContainer__action}>
          <Link
            href='/reset-password'
            className={styles.activeCardContainer__link}
          >
            비밀번호 변경
          </Link>
          <Link
            href='/reset-phone'
            className={styles.activeCardContainer__link}
          >
            전화번호 변경
          </Link>
        </div>
      </div>
    </div>
  );
}
