'use client';

// package
import Image from 'next/image';

// slice
import styles from '../styles/Main.module.scss';
import { MainPresenterProps } from '../types';

// layer
import VideoBackground from '@/shared/ui/background/videoBackground/VideoBackground';

export default function MainPresenter({
  isClicked,
  onClick,
}: MainPresenterProps) {
  return (
    <div className={styles.homeContainer}>
      <VideoBackground />
      <div
        className={`${styles.homeContainer__center} ${
          isClicked ? styles.clicked : ''
        }`}
        onClick={onClick}
      >
        <div className={styles.logoWrapper}>
          <Image
            src='/images/logo_white_full.png'
            alt='logo'
            width={300}
            height={300}
          />
        </div>
      </div>
    </div>
  );
}
