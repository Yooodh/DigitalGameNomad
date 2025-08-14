'use client';

// package
import { useState, useRef } from 'react';

// slice
import HeaderPres from '../presenter/NavbarPresenter';

// layer
import { useOnClickOutside } from '@/shared/hooks/useOnClickOutside';
import { useLockBodyScroll } from '@/shared/hooks/useLockBodyScroll';
import { useCloseMenuOnResize } from '@/shared/hooks/useCloseMenuOnResize';
import { useThemeStore } from '@/shared/stores/useThemeStore';
import { useAuthStore, useAuthActions } from '@/shared/stores/useAuthStore';

export default function NavbarContainer() {
  const { isLoggedIn, userGrade } = useAuthStore();
  const { handleLogout } = useAuthActions();
  const [hasNotification, _setHasNotification] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { theme, toggleTheme } = useThemeStore();

  const menuRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  useLockBodyScroll(isMenuOpen);
  useCloseMenuOnResize(isMenuOpen, () => setIsMenuOpen(false));
  useOnClickOutside(
    menuRef,
    () => {
      setIsMenuOpen(false);
    },
    {
      enabled: isMenuOpen,
      excludeRefs: [toggleButtonRef],
    }
  );

  const onToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const onMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <HeaderPres
      isLoggedIn={isLoggedIn}
      userGrade={userGrade || undefined}
      hasNotification={hasNotification}
      onLogout={() => {
        const confirmLogout = window.confirm('정말로 로그아웃 하시겠습니까?');

        if (confirmLogout) {
          setIsMenuOpen(false);
          handleLogout();
        }
      }}
      onToggleMenu={onToggleMenu}
      onMenuItemClick={onMenuItemClick}
      isMenuOpen={isMenuOpen}
      menuRef={menuRef}
      toggleButtonRef={toggleButtonRef}
      theme={theme}
      onToggleTheme={toggleTheme}
    />
  );
}
