'use client';

// package
import Link from 'next/link';

// slice
import styles from '../styles/Participation.module.scss';
import { CtaCardProps } from '../types';

export default function CtaCard({
  buttonNavVisible,
  setButtonNavRef,
}: CtaCardProps) {
  return (
    <div
      className={`${styles.ctaConatiner__card} ${
        buttonNavVisible.has(1) ? styles['fade-in'] : ''
      }`}
      ref={(el) => setButtonNavRef(el, 1)}
      data-id={1}
    >
      <div className={styles.ctaConatiner__content}>
        <h3 className={styles.ctaConatiner__title}>지금 바로 시작하세요</h3>
        <p className={styles.ctaConatiner__desc}>
          혁신적인 3D 가상 전시관에서 귀하의 게임을 선보일 기회를 놓치지 마세요
        </p>
        <Link className={styles.ctaConatiner__btn} href='/member/apply'>
          <span>참여신청 하기</span>
          <div className={styles.ctaConatiner__btnArrow}>→</div>
        </Link>
      </div>
    </div>
  );
}
