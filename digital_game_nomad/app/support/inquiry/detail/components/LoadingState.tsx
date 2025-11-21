// slice
import styles from '../styles/Detail.module.scss';

// layer
import Spinner from '@/shared/components/Spinner';

export default function LoadingState() {
  return (
    <div className={styles.loadingContainer}>
      <Spinner message='문의 내역 불러오는 중...' />
    </div>
  );
}
