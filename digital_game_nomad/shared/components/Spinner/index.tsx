// slice
import styles from './Spinner.module.scss';
import { SpinnerProps } from '../../types';

export default function Spinner({ message }: SpinnerProps) {
  return (
    <div className={styles.loading}>
      <div className={styles.spinner}></div>
      {message && <p>{message}</p>}
    </div>
  );
}
