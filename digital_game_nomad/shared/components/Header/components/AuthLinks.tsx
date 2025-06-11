// package
import Link from 'next/link';
import styles from '../styles/Header.module.scss';

// slice
import { AuthLinksProps } from '../types';

export default function AuthLinks({
  isLoggedIn,
  userGrade,
  hasNotification,
  onLogout,
  onMenuItemClick,
  isMenuOpen,
}: AuthLinksProps & { isMenuOpen: boolean }) {
  return (
    <ul
      className={`${styles.headerContainer__links} ${
        isMenuOpen ? styles.open : ''
      }`}
    >
      {hasNotification && (
        <li>
          <strong>🔔</strong>
        </li>
      )}
      {userGrade === 1 && isLoggedIn && (
        <li>
          <Link href='/' onClick={onMenuItemClick}>
            신청기업리스트
          </Link>
        </li>
      )}
      {userGrade === 2 && isLoggedIn && (
        <>
          <li>
            <Link href='/' onClick={onMenuItemClick}>
              신청내역보기
            </Link>
          </li>
          <li>
            <Link href='/' onClick={onMenuItemClick}>
              회원정보(기업)
            </Link>
          </li>
        </>
      )}
      {userGrade === 3 && isLoggedIn && (
        <li>
          <Link href='/' onClick={onMenuItemClick}>
            회원정보(일반)
          </Link>
        </li>
      )}
      {!isLoggedIn && (
        <>
          <li>
            <Link href='/' onClick={onMenuItemClick}>
              로그인
            </Link>
          </li>
          <li>
            <Link href='/' onClick={onMenuItemClick}>
              회원가입
            </Link>
          </li>
        </>
      )}
      {isLoggedIn && (
        <li>
          <button onClick={onLogout}>로그아웃</button>
        </li>
      )}
    </ul>
  );
}
