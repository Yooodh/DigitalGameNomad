// slice
import styles from '../styles/Board.module.scss';
import { NavigationProps, TabType } from '../types';

export default function Navigation({ activeTab, onTabClick }: NavigationProps) {
  const tabs: TabType[] = ['전체', '자유', '후기'];
  return (
    <nav className={styles.navContainer}>
      <div className={styles.navContainer__nav}>
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`${styles.navContainer__btn} ${
              activeTab === tab ? styles.active : ''
            }`}
            onClick={() => onTabClick(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    </nav>
  );
}
