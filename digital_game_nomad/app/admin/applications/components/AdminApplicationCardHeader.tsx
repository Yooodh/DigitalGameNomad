// slice
import styles from '../styles/AdminApplications.module.scss';
import { AdminApplicationCardHeaderProps } from '../types';

export default function AdminApplicationCardHeader({
  application,
  isSelected,
  onToggleSelection,
}: AdminApplicationCardHeaderProps) {
  return (
    <div className={styles.gridCardHeaderContainer}>
      <div className={styles.gridCardHeaderContainer__title}>
        {application.gameName}
      </div>
      <input
        type='checkbox'
        checked={isSelected}
        onChange={() => onToggleSelection(application.id)}
        className={styles.gridCardHeaderContainer__checkbox}
      />
    </div>
  );
}
