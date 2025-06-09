// package
import Image from 'next/image';
import Link from 'next/link';

// slice
import styles from './main.module.scss';

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.homeContainer__bg}>
        <video className={styles.homeContainer__video} autoPlay muted loop>
          <source src='/videos/network.mp4' type='video/mp4' />
        </video>
        <Link href='/select'>
          <div className={styles.homeContainer__center}>
            <Image
              src='/images/full_logo_white.png'
              alt='logo'
              width={300}
              height={300}
            />
            <button className={styles.homeContainer__btn}>Click to Play</button>
          </div>
        </Link>
      </div>
    </div>
  );
}
