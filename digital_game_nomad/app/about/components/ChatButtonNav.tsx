// package
import Link from 'next/link';

// slice
import styles from '../styles/About.module.scss';

export default function ChatButtonNav() {
  return (
    <div className={styles.chat__talkButtonNav}>
      <Link className={styles.chat__talkButton} href='/select'>
        전시관 입장하기
      </Link>
    </div>
  );
}
