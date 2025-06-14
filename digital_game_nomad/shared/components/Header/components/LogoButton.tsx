'use client';

// package
import Link from 'next/link';
import Image from 'next/image';

// slice
import styles from '../styles/Header.module.scss';
import { LogoButtonProps } from '../types';

export default function LogoButton({
  onMenuItemClick,
  onToggleMenu,
  isMenuOpen,
  toggleButtonRef,
}: LogoButtonProps) {
  return (
    <div className={styles.headerContainer__logo}>
      <Link href='/' onClick={onMenuItemClick}>
        <Image
          src='/images/logo_white_half.png'
          alt='logo'
          width={40}
          height={40}
        />
      </Link>
      <button
        ref={toggleButtonRef}
        onClick={onToggleMenu}
        className={styles.headerContainer__toggleLogo}
        aria-label={isMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
        aria-expanded={isMenuOpen}
      >
        <Image src='/images/hamburger.png' alt='menu' width={40} height={40} />
      </button>
    </div>
  );
}
