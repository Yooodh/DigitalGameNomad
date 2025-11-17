// slice
import styles from '../styles/Loading.module.scss';
import { LoadingPresenterProps } from '../types';

// layer
import Spinner from '@/shared/components/Spinner';

export default function LoadingPresenter({ message }: LoadingPresenterProps) {
  return (
    <div className={styles.loadingContainer}>
      <Spinner message={message || '로딩 중...'} />
    </div>
  );
}
