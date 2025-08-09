// package
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { useRouter } from 'next/navigation';

// slice
import { useRegisteredUsersStore } from './useRegisteredUsersStore';
import { AuthState } from '../types';

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      userGrade: null,
      userEmail: null,
      isHydrated: false,
      login: (userGrade, userEmail) => {
        const registeredUsers = useRegisteredUsersStore.getState().users;
        const foundUser = registeredUsers.find(
          (user) => user.email === userEmail
        );

        if (foundUser) {
          if (foundUser.deleteDate) {
            window.alert('탈퇴 처리된 계정입니다.');
            return;
          }
          set({
            isLoggedIn: true,
            userGrade: userGrade,
            userEmail: userEmail,
          });
        } else {
          console.error(`로그인 시도: 사용자를 찾을 수 없음 - ${userEmail}`);
          window.alert('사용자 정보를 찾을 수 없습니다.');
        }
      },
      logout: () => {
        set({
          isLoggedIn: false,
          userGrade: null,
          userEmail: null,
        });
      },
      checkLoginStatus: () => {},
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isHydrated = true;
        }
      },
    }
  )
);

export function useAuthActions() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return { handleLogout };
}
