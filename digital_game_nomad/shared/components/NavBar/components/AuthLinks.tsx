// package
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// slice
import styles from '../styles/Navbar.module.scss';
import { AuthLinksProps } from '../types';

export default function AuthLinks({
  isLoggedIn,
  userGrade,
  onLogout,
  onMenuItemClick,
  isMenuOpen,
}: AuthLinksProps & { isMenuOpen: boolean }) {
  const pathname = usePathname();

  return (
    <ul
      className={`${styles.navbarContainer__links} ${
        isMenuOpen ? styles.open : ''
      }`}
    >
      {userGrade === 1 && isLoggedIn && (
        <>
          <li>
            <Link
              href='/admin/users'
              onClick={onMenuItemClick}
              className={pathname === '/admin/users' ? styles.active : ''}
            >
              유저관리
            </Link>
          </li>
          <li>
            <Link
              href='/admin/inquiry'
              onClick={onMenuItemClick}
              className={pathname === '/admin/inquiry' ? styles.active : ''}
            >
              문의내역관리
            </Link>
          </li>
          <li>
            <Link
              href='/admin/applications'
              onClick={onMenuItemClick}
              className={
                pathname === '/admin/applications' ? styles.active : ''
              }
            >
              신청기업리스트
            </Link>
          </li>
        </>
      )}
      {userGrade === 2 && isLoggedIn && (
        <>
          <li>
            <Link
              href='/company/applications'
              onClick={onMenuItemClick}
              className={
                pathname === '/company/applications' ? styles.active : ''
              }
            >
              신청내역보기
            </Link>
          </li>
          <li>
            <Link
              href='/profile'
              onClick={onMenuItemClick}
              className={pathname === '/profile' ? styles.active : ''}
            >
              회원정보(기업)
            </Link>
          </li>
        </>
      )}
      {userGrade === 3 && isLoggedIn && (
        <li>
          <Link
            href='/profile'
            onClick={onMenuItemClick}
            className={pathname === '/profile' ? styles.active : ''}
          >
            회원정보(일반)
          </Link>
        </li>
      )}
      {!isLoggedIn && (
        <>
          <li>
            <Link
              href='/login'
              onClick={onMenuItemClick}
              className={pathname === '/login' ? styles.active : ''}
            >
              로그인
            </Link>
          </li>
          <li>
            <Link
              href='/register'
              onClick={onMenuItemClick}
              className={pathname === '/register' ? styles.active : ''}
            >
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
