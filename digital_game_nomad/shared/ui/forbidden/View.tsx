'use client';

// package
import Image from 'next/image';

// slice
import styles from './View.module.scss';

const MESSAGE_MAP: Record<string, string> = {
  admin: '관리자 전용 페이지입니다.',
  company: '기업 전용 페이지입니다.',
  user: '로그인이 필요한 페이지입니다.',
  default: '접근 권한이 없습니다.',
};

export default function View({ reason }: { reason: string }) {
  return (
    <div className={styles.Container}>
      <Image
        src='/images/logo_white_half.png'
        alt='logo'
        width={200}
        height={200}
      />
      <h1>403</h1>
      <p>{MESSAGE_MAP[reason] ?? MESSAGE_MAP.default}</p>
      <a href='/'>홈으로 이동</a>
    </div>
  );
}
