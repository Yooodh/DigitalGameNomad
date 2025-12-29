'use client';

// package
import { useState, useRef, useCallback } from 'react';

// slice
import HeaderPres from '../presenter/NavbarPresenter';

// layer
import { useOnClickOutside } from '@/shared/hooks/useOnClickOutside';
import { useLockBodyScroll } from '@/shared/hooks/useLockBodyScroll';
import { useCloseMenuOnResize } from '@/shared/hooks/useCloseMenuOnResize';
import { useThemeStore } from '@/shared/stores/useThemeStore';
import { useAuthStore, useAuthActions } from '@/shared/stores/useAuthStore';
import { customConfirm } from '@/shared/utils/customConfirm';

export default function NavbarContainer() {
  const { isLoggedIn, userGrade } = useAuthStore();
  const { handleLogout } = useAuthActions();
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

  const onLogout = useCallback(async () => {
    const confirmed = await customConfirm('로그아웃', '로그아웃 하시겠습니까?');

    if (confirmed) {
      setIsMenuOpen(false);
      handleLogout();
    }
  }, [handleLogout]);

  return (
    <HeaderPres
      isLoggedIn={isLoggedIn}
      userGrade={userGrade || undefined}
      onLogout={onLogout}
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
