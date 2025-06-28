// slice
import styles from '../styles/Profile.module.scss';
import { TabsProps } from '../types';

export default function Tabs({ activeTab, onSetActiveTab }: TabsProps) {
  return (
    <div className={styles.navContainer}>
      <button
        onClick={() => onSetActiveTab('info')}
        className={`${styles.navContainer__tab} ${
          activeTab === 'info' ? styles.tabActive : ''
        }`}
      >
        개인정보
      </button>
      <button
        onClick={() => onSetActiveTab('activity')}
        className={`${styles.navContainer__tab} ${
          activeTab === 'activity' ? styles.tabActive : ''
        }`}
      >
        활동정보
      </button>
    </div>
  );
}
