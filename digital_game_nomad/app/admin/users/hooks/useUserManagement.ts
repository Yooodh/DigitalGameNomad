// package
import { useState, useCallback, useMemo } from 'react';

// slice
import { MOCK_USERS } from '../data';
import { UserData, UserManagementState } from '../types';

export const useUserManagement = (): UserManagementState & {
  handlePasswordReset: (userId: number, userName: string) => void;
  handleUserRestore: (userId: number, userName: string) => void;
  handleHardDeleteUser: (userId: number, userName: string) => void;
  overallTotalUsers: number;
  totalActiveUsers: number;
  totalBusinessUsers: number;
  totalGeneralUsers: number;
  totalDeletedUsers: number;
} => {
  const [users, setUsers] = useState<UserData[]>(MOCK_USERS);

  const handlePasswordReset = useCallback(
    (userId: number, userName: string) => {
      if (confirm(`${userName}님의 비밀번호를 초기화하시겠습니까?`)) {
        alert(`${userName}님의 비밀번호가 초기화되었습니다.`);
      }
    },
    []
  );

  const handleHardDeleteUser = useCallback(
    (userId: number, userName: string) => {
      if (
        confirm(
          `${userName}님을 완전히 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`
        )
      ) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        alert(`${userName}님이 완전히 삭제되었습니다.`);
      }
    },
    []
  );

  const handleUserRestore = useCallback((userId: number, userName: string) => {
    if (confirm(`${userName}님을 복구하시겠습니까?`)) {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, deleteDate: undefined } : user
        )
      );
      alert(`${userName}님이 복구되었습니다.`);
    }
  }, []);

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
