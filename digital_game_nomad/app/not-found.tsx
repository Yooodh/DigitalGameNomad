// package
import Image from 'next/image';
import Link from 'next/link';

// layer
import styles from '@/shared/ui/forbidden/View.module.scss';

export default function NotFound() {
  return (
    <div className={styles.Container}>
      <Image
        src='/images/logo_white_half.png'
        alt='logo'
        width={200}
        height={200}
      />
      <h1>404</h1>
      <p>페이지를 찾을 수 없습니다.</p>
      <Link href='/'>홈으로 이동</Link>
    </div>
  );
}
