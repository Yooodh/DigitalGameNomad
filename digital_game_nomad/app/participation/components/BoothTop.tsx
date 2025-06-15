'use client';

// package
import Image from 'next/image';

// slice
import styles from '../styles/Participation.module.scss';
import { BoothTopProps } from '../types';

// layer
import boothTop from '@/public/images/booth_top.png';

export default function BoothTop({
  boothTopVisible,
  setBoothTopRef,
}: BoothTopProps) {
  return (
    <div className={styles.boothContainer__content}>
      <div
        className={`${styles.boothContainer__imgWrap} ${
          boothTopVisible.has(1) ? styles['fade-in-bottom'] : ''
        }`}
        ref={(el) => setBoothTopRef(el, 1)}
        data-id={1}
      >
        <div className={styles.boothContainer__image}>
          <Image
            src={boothTop}
            className={styles.boothContainer__boothTop}
            alt='부스 상단 이미지'
            priority
          />
        </div>
      </div>
    </div>
  );
}
