// slice
import styles from '../styles/Board.module.scss';
import { HeaderProps } from '../types';

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerContainer__content}>
        <h1 className={styles.headerContainer__title}>{title}</h1>
        <p className={styles.headerContainer__subtitle}>{subtitle}</p>
      </div>
    </div>
  );
}
