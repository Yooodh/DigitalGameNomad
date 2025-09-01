// package
import { useCallback, useMemo } from 'react';

// slice
import { UserData, UserManagementState } from '../types';

// layer
import { useRegisteredUsersStore } from '@/shared/stores/useRegisteredUsersStore';

export const useUserManagement = (): UserManagementState & {
  handlePasswordReset: (userId: string, userName: string) => void;
  handleUserRestore: (userId: string, userName: string) => void;
  handleHardDeleteUser: (userId: string, userName: string) => void;
  overallTotalUsers: number;
  totalActiveUsers: number;
  totalBusinessUsers: number;
  totalGeneralUsers: number;
  totalDeletedUsers: number;
} => {
  const registeredUsersFromStore = useRegisteredUsersStore(
    (state) => state.users
  );
  const updateUserProfileInStore = useRegisteredUsersStore(
    (state) => state.updateUserProfile
  );
  const removeUserFromStore = useRegisteredUsersStore(
    (state) => state.removeUser
  );

  const users: UserData[] = useMemo(() => {
    return registeredUsersFromStore.map((user) => ({
      id: user.id ? String(user.id) : user.email,
      name: user.name || '',
      nickname: user.nickname || '',
      email: user.email,
      phone: user.phone || ['', '', '', ''],
      userLevel: user.userGrade,
      joinDate: user.joinDate || '',
      lastLoginDate: user.lastLoginDate || '',
      deleteDate: user.deleteDate,
      isSelected: false,
    }));
  }, [registeredUsersFromStore]);

  const setUsers = useCallback(() => {
    console.warn(
      'setUsers is no longer directly used in useUserManagement. Update the Zustand store instead.'
    );
  }, []);
  const handlePasswordReset = useCallback(
    (userId: string, userName: string) => {
      if (window.confirm(`${userName}님의 비밀번호를 초기화하시겠습니까?`)) {
        const userToReset = users.find((u) => u.email === userId);
        if (userToReset) {
          updateUserProfileInStore(userToReset.email, {
            password: 'qwer1234!',
            lastLoginDate: new Date().toISOString().slice(0, 10),
          });
        } else {
          console.warn(
            `사용자 ID ${userId}를 찾을 수 없어 비밀번호를 초기화할 수 없습니다.`
          );
        }
      }
    },
    [users, updateUserProfileInStore]
  );
  const handleHardDeleteUser = useCallback(
    (userId: string, userName: string) => {
      if (
        window.confirm(
          `${userName}님을 완전히 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`
        )
      ) {
        const userEmail = users.find((u) => u.email === userId)?.email;
        if (userEmail) {
          removeUserFromStore(userEmail);
        } else {
          console.warn(
            `사용자 ID ${userId}를 찾을 수 없어 완전히 삭제할 수 없습니다.`
          );
        }
      }
    },
    [users, removeUserFromStore]
  );

  const handleUserRestore = useCallback(
    (userId: string, userName: string) => {
      if (window.confirm(`${userName}님을 복구하시겠습니까?`)) {
        const userEmail = users.find((u) => u.email === userId)?.email;
        if (userEmail) {
          updateUserProfileInStore(userEmail, { deleteDate: undefined });
        } else {
          console.warn(
            `사용자 ID ${userId}를 찾을 수 없어 복구할 수 없습니다.`
          );
        }
      }
    },
    [users, updateUserProfileInStore]
  );

  const overallTotalUsers = useMemo(() => users.length, [users]);
  const totalActiveUsers = useMemo(
    () => users.filter((u) => !u.deleteDate).length,
    [users]
  );
  const totalBusinessUsers = useMemo(
    () => users.filter((u) => u.userLevel === 2 && !u.deleteDate).length,
    [users]
  );
  const totalGeneralUsers = useMemo(
    () => users.filter((u) => u.userLevel === 3 && !u.deleteDate).length,
    [users]
  );
  const totalDeletedUsers = useMemo(
    () => users.filter((u) => u.deleteDate).length,
    [users]
  );

  return {
    users,
    setUsers,
    handlePasswordReset,
    handleUserRestore,
    handleHardDeleteUser,
    overallTotalUsers,
    totalActiveUsers,
    totalBusinessUsers,
    totalGeneralUsers,
    totalDeletedUsers,
  };
};
