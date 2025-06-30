// slice
import styles from '../styles/ResetPhone.module.scss';
import { InfoDisplayProps } from '../types';

export default function InfoDisplay({ items }: InfoDisplayProps) {
  return (
    <div className={styles.infoContainer}>
      {items.map((item) => (
        <div key={item.label} className={styles.infoContainer__item}>
          <span className={styles.infoContainer__label}>{item.label}:</span>
          <span className={styles.infoContainer__value}>{item.value}</span>
        </div>
      ))}
    </div>
  );
}
