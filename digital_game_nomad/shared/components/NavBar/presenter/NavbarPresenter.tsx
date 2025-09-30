// slice
import MenuList from '../components/MenuList';
import AuthLinks from '../components/AuthLinks';
import LogoButton from '../components/LogoButton';
import ThemeButton from '../components/ThemeButton';
import styles from '../styles/Navbar.module.scss';
import { NavbarPresenterProps } from '../types';

export default function NavbarPresenter({
  isLoggedIn,
  userGrade,
  hasNotification,
  onLogout,
  onToggleMenu,
  onMenuItemClick,
  isMenuOpen,
  menuRef,
  toggleButtonRef,
  theme,
  onToggleTheme,
}: NavbarPresenterProps) {
  return (
    <div className={styles.navbarContainer}>
      <LogoButton
        onMenuItemClick={onMenuItemClick}
        onToggleMenu={onToggleMenu}
        isMenuOpen={isMenuOpen}
        toggleButtonRef={toggleButtonRef}
      />
      <ThemeButton theme={theme} onToggleTheme={onToggleTheme} />
      <div ref={menuRef} className={styles.navbarContainer__menuWrap}>
        <MenuList onMenuItemClick={onMenuItemClick} isMenuOpen={isMenuOpen} />
        <AuthLinks
          isLoggedIn={isLoggedIn}
          userGrade={userGrade}
          hasNotification={hasNotification}
          onLogout={onLogout}
          onMenuItemClick={onMenuItemClick}
          isMenuOpen={isMenuOpen}
        />
      </div>
    </div>
  );
}
