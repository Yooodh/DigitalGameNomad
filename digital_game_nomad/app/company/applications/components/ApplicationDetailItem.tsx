// slice
import styles from '../styles/Applications.module.scss';
import { ApplicationDetailItemProps } from '../types';

export default function ApplicationDetailItem({
  icon,
  label,
  value,
  className,
}: ApplicationDetailItemProps) {
  if (!value) {
    return null;
  }
  return (
    <div className={`${styles.gridCardSectionContainer} ${className || ''}`}>
      <span className={styles.gridCardSectionContainer__icon}>{icon}</span>
      {label}: {value}
    </div>
  );
}
