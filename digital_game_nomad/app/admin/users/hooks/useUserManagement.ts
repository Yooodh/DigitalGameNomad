// package
import { useCallback, useMemo } from 'react';
import { toast } from 'react-toastify';

// slice
import { UserData, UserManagementState } from '../types';

// layer
import { useRegisteredUsersStore } from '@/shared/stores/useRegisteredUsersStore';
import { customConfirm } from '@/shared/utils/customConfirm';

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

  const handlePasswordReset = useCallback(
    async (userId: string, userName: string) => {
      const confirmed = await customConfirm(
        '비밀번호 초기화',
        `${userName}님의 비밀번호를 초기화하시겠습니까?`
      );

      if (confirmed) {
        const userToReset = users.find((u) => u.email === userId);
        if (userToReset) {
          updateUserProfileInStore(userToReset.email, {
            password: 'qwer1234!',
            lastLoginDate: new Date().toISOString().slice(0, 10),
          });
          toast.success(`${userName}님의 비밀번호가 초기화되었습니다.`);
        } else {
          toast.error('사용자를 찾을 수 없습니다.');
        }
      }
    },
    [users, updateUserProfileInStore]
  );

  const handleHardDeleteUser = useCallback(
    async (userId: string, userName: string) => {
      const confirmed = await customConfirm(
        '영구 삭제',
        `${userName}님을 완전히 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`
      );

      if (confirmed) {
        const userEmail = users.find((u) => u.email === userId)?.email;
        if (userEmail) {
          removeUserFromStore(userEmail);
          toast.success(`${userName}님이 영구 삭제되었습니다.`);
        } else {
          toast.error('사용자를 찾을 수 없습니다.');
        }
      }
    },
    [users, removeUserFromStore]
  );

  const handleUserRestore = useCallback(
    async (userId: string, userName: string) => {
      const confirmed = await customConfirm(
        '사용자 복구',
        `${userName}님을 복구하시겠습니까?`
      );

      if (confirmed) {
        const userEmail = users.find((u) => u.email === userId)?.email;
        if (userEmail) {
          updateUserProfileInStore(userEmail, { deleteDate: undefined });
          toast.success(`${userName}님의 계정이 복구되었습니다.`);
        } else {
          toast.error('사용자를 찾을 수 없습니다.');
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
