// package
import Link from 'next/link';

// slice
import styles from '../styles/Header.module.scss';
import { MenuListProps } from '../types';

export default function MenuList({
  onMenuItemClick,
  isMenuOpen,
}: MenuListProps & { isMenuOpen: boolean }) {
  return (
    <ul
      className={`${styles.headerContainer__menu} ${
        isMenuOpen ? styles.open : ''
      }`}
    >
      <li>
        <Link href='/about' onClick={onMenuItemClick}>
          소개페이지
        </Link>
      </li>
      <li>
        <Link href='/company' onClick={onMenuItemClick}>
          기업참여신청
        </Link>
      </li>
      <li>
        <Link href='/board' onClick={onMenuItemClick}>
          게시판
        </Link>
      </li>
      <li>
        <Link href='/support' onClick={onMenuItemClick}>
          고객센터
        </Link>
      </li>
    </ul>
  );
}
