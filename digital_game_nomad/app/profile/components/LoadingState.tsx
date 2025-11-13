// slice
import styles from '../styles/Profile.module.scss';

// layer
import Spinner from '@/shared/components/Spinner';

export default function LoadingState() {
  return (
    <div className={styles.loadingContainer}>
      <Spinner message='프로필 정보를 불러오는 중...' />
    </div>
  );
}
