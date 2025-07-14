// slice
import styles from '../styles/Detail.module.scss';
import { ListItemProps } from '../types';

export default function ListItem({
  inquiry,
  onDeleteInquiry,
  onOpenDetailModal,
  getStatusClass,
}: ListItemProps) {
  return (
    <div className={styles.contentContainer}>
      <div className={styles.contentContainer__header}>
        <div className={styles.metaContainer}>
          <span className={styles.metaContainer__id}>{inquiry.id}</span>
          <span className={styles.metaContainer__date}>
            {inquiry.createdAt}
          </span>
        </div>
        <div className={styles.actionContainer}>
          {inquiry.status === '접수' && (
            <button
              className={styles.actionContainer__deleteBtn}
              onClick={() => onDeleteInquiry(inquiry.id)}
            >
              삭제
            </button>
          )}
        </div>
      </div>

      <div
        className={styles.descContainer}
        onClick={() => onOpenDetailModal(inquiry)}
      >
        <div className={styles.wrapContainer}>
          <span
            className={`${styles.statusBadge} ${getStatusClass(
              inquiry.status
            )}`}
          >
            {inquiry.status}
          </span>
          <h3 className={styles.wrapContainer__title}>{inquiry.title}</h3>
        </div>
        <p className={styles.descContainer__prev}>
          {inquiry.content.slice(0, 100)}
        </p>
      </div>
    </div>
  );
}
