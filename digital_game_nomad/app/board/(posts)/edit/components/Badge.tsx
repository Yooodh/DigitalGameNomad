// slice
import styles from '../styles/Edit.module.scss';
import { BadgeProps } from '../types';

export default function BadgeDisplay({ topic }: BadgeProps) {
  return (
    <div className={styles.badgeContainer}>
      <label className={styles.topicContainer}>
        <input
          type='radio'
          name='topic'
          value={topic}
          checked={true}
          disabled
        />
        <span
          className={`${styles.radio} ${
            topic === '자유' ? styles.free : styles.review
          }`}
        >
          {topic}
        </span>
      </label>
    </div>
  );
}
