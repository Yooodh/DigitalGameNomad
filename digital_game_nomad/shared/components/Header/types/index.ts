export type LogoButtonProps = {
  onMenuItemClick: () => void;
  onToggleMenu: () => void;
  isMenuOpen: boolean;
  toggleButtonRef: React.RefObject<HTMLButtonElement | null>;
};

export type MenuListProps = {
  onMenuItemClick: () => void;
  isMenuOpen?: boolean;
};

export type AuthLinksProps = {
  isLoggedIn: boolean;
  userGrade?: number;
  hasNotification?: boolean;
  onLogout: () => void;
  onMenuItemClick: () => void;
  isMenuOpen?: boolean;
};

export type ThemeButtonProps = {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
};

export type HeaderContainerProps = {
  userGrade?: number;
  isLoggedIn: boolean;
  onLogout: () => void;
};

export type HeaderPresenterProps = {
  isLoggedIn: boolean;
  userGrade?: number;
  hasNotification?: boolean;
  onLogout: () => void;
  onToggleMenu: () => void;
  onMenuItemClick: () => void;
  isMenuOpen: boolean;
  menuRef: React.RefObject<HTMLDivElement | null>;
  toggleButtonRef: React.RefObject<HTMLButtonElement | null>;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
};
