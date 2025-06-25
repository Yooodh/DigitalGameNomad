// slice
import styles from '../styles/Inquiry.module.scss';
import { HeaderProps } from '../types';

export default function Header({ title, subTitle }: HeaderProps) {
  return (
    <div className={styles.headerContainer}>
      <h1 className={styles.headerContainer__title}>{title}</h1>
      {subTitle && (
        <p className={styles.headerContainer__subTitle}>{subTitle}</p>
      )}
    </div>
  );
}
