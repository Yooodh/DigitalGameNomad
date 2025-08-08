// package
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// slice
import { RegisteredUsersState } from '../types';

export const useRegisteredUsersStore = create<RegisteredUsersState>()(
  persist(
    (set, _get) => ({
      users: [
        {
          id: 'admin-1',
          email: 'admin@test.com',
          password: 'qwer1234!',
          userGrade: 1,
          nickname: '관리자',
          name: '관리자',
          phone: ['', '', '', ''],
          profileImage: null,
          joinDate: '2024-01-01',
          lastLoginDate: '2024-07-07',
          deleteDate: undefined,
        },
        {
          id: 'company-1',
          email: 'company@test.com',
          password: 'qwer1234!',
          userGrade: 2,
          nickname: '기업회원',
          name: '기업회원',
          phone: ['SKT', '010', '2222', '3333'],
          profileImage: null,
          joinDate: '2024-01-01',
          lastLoginDate: '2024-07-06',
          deleteDate: undefined,
        },
        {
          id: 'user-1',
          email: 'user@test.com',
          password: 'qwer1234!',
          userGrade: 3,
          nickname: '일반회원',
          name: '일반회원',
          phone: ['KT', '010', '4444', '5555'],
          profileImage: null,
          joinDate: '2024-01-01',
          lastLoginDate: '2024-07-07',
          deleteDate: undefined,
        },
      ],
      addUser: (user) =>
        set((state) => ({
          users: [
            ...state.users,
            {
              id: crypto.randomUUID(),
              ...user,
              lastLoginDate: new Date().toISOString().slice(0, 10),
            },
          ],
        })),
      updateUserGrade: (email, newGrade) =>
        set((state) => ({
          users: state.users.map((user) =>
            user.email === email ? { ...user, userGrade: newGrade } : user
          ),
        })),
      updateUserProfile: (email, updatedFields) =>
        set((state) => ({
          users: state.users.map((user) =>
            user.email === email
              ? {
                  ...user,
                  ...updatedFields,
                }
              : user
          ),
        })),
      removeUser: (email) =>
        set((state) => ({
          users: state.users.filter((user) => user.email !== email),
        })),
    }),
    {
      name: 'registered-users-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
