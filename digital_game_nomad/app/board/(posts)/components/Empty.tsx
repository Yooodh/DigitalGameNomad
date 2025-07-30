// slice
import styles from '../styles/BoardPost.module.scss';
import { EmptyProps } from '../types';

// layer
import { Alert } from '@/shared/icons';

export default function Empty({
  title,
  message,
  buttonText,
  onButtonClick,
}: EmptyProps) {
  return (
    <div className={styles.emptyContainer}>
      <div className={styles.emptyContainer__icon}>
        <Alert />
      </div>
      <h3 className={styles.emptyContainer__title}>{title}</h3>
      <p>{message}</p>
      {buttonText && onButtonClick && (
        <button
          className={styles.emptyContainer__navBtn}
          onClick={onButtonClick}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
}
