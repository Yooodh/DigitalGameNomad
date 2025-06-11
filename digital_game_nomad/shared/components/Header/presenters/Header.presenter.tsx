// slice
import MenuList from '../components/MenuList';
import AuthLinks from '../components/AuthLinks';
import LogoButton from '../components/LogoButton';
import ThemeButton from '../components/ThemeButton';

import styles from '../styles/Header.module.scss';
import { HeaderPresenterProps } from '../types';

export default function HeaderPresenter({
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
}: HeaderPresenterProps) {
  return (
    <div className={styles.headerContainer}>
      <LogoButton
        onMenuItemClick={onMenuItemClick}
        onToggleMenu={onToggleMenu}
        isMenuOpen={isMenuOpen}
        toggleButtonRef={toggleButtonRef}
      />
      <div ref={menuRef} className={styles.headerContainer__menuWrap}>
        <MenuList onMenuItemClick={onMenuItemClick} isMenuOpen={isMenuOpen} />
        <AuthLinks
          isLoggedIn={isLoggedIn}
          userGrade={userGrade}
          hasNotification={hasNotification}
          onLogout={onLogout}
          onMenuItemClick={onMenuItemClick}
          isMenuOpen={isMenuOpen}
        />
        <ThemeButton theme={theme} onToggleTheme={onToggleTheme} />
      </div>
    </div>
  );
}
