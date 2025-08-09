import { RefObject } from 'react';

export type UseIntersectionVisibilityOptions = {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  offsetForLastItems?: number;
};

export type AnimatedBackgroundProps = {
  children?: React.ReactNode;
  variant?: 'default' | 'blue' | 'purple';
  intensity?: 'subtle' | 'default' | 'intense';
  position?: 'relative' | 'fixed' | 'absolute';
  fullscreen?: boolean;
  className?: string;
};

export type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  buttonRef?: RefObject<HTMLButtonElement | null>;
};

export type PasswordToggleButtonProps = {
  showPassword: boolean;
  togglePasswordVisibility: () => void;
};

export type SpinnerProps = {
  message?: string;
};

export type ScrollBehavior = 'auto' | 'smooth';

export type RegisteredUser = {
  id: string;
  email: string;
  password: string;
  userGrade: number;
  nickname?: string;
  name?: string;
  phone?: [string, string, string, string];
  profileImage?: string | null;
  joinDate?: string;
  lastLoginDate?: string;
  deleteDate?: string;
};

export type RegisteredUsersState = {
  users: RegisteredUser[];
  addUser: (user: Omit<RegisteredUser, 'id' | 'lastLoginDate'>) => void;
  updateUserGrade: (email: string, newGrade: number) => void;
  updateUserProfile: (
    email: string,
    updatedFields: Partial<Omit<RegisteredUser, 'email' | 'joinDate' | 'id'>>
  ) => void;
  removeUser: (email: string) => void;
};

export type AuthState = {
  isLoggedIn: boolean;
  userGrade: number | null;
  userEmail: string | null;
  isHydrated: boolean;
  login: (userGrade: number, userEmail: string) => void;
  logout: () => void;
  checkLoginStatus: () => void;
};
