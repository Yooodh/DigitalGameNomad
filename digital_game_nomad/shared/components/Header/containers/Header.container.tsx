'use client';

// package
import { useState, useRef } from 'react';

// slice
import HeaderPres from '../presenters/Header.presenter';
import { HeaderContainerProps } from '../types';

// hook
import { useOnClickOutside } from '@/shared/hooks/useOnClickOutside';
import { useLockBodyScroll } from '@/shared/hooks/useLockBodyScroll';
import { useCloseMenuOnResize } from '@/shared/hooks/useCloseMenuOnResize';

// layer
import { useThemeStore } from '@/shared/stores/useThemeStore';

export default function HeaderContainer({
  userGrade,
  isLoggedIn,
  onLogout,
}: HeaderContainerProps) {
  const [hasNotification, setHasNotification] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useThemeStore();

  const menuRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  // 메뉴가 열렸을 때 body 스크롤 방지
  useLockBodyScroll(isMenuOpen);

  // 윈도우 리사이즈 시 메뉴 자동 닫기
  useCloseMenuOnResize(isMenuOpen, () => setIsMenuOpen(false));

  // 외부 클릭 시 메뉴 닫기
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

  const handleLogout = () => {
    onLogout();
    setIsMenuOpen(false);
  };

  const onToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const onMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <HeaderPres
      isLoggedIn={isLoggedIn}
      userGrade={userGrade}
      hasNotification={hasNotification}
      onLogout={handleLogout}
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
