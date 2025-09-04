// slice
import { useAuthStore } from '../stores/useAuthStore';
import { useRegisteredUsersStore } from '../stores/useRegisteredUsersStore';

export function getCurrentUserInfo() {
  const { userEmail, isLoggedIn } = useAuthStore.getState();
  const users = useRegisteredUsersStore.getState().users;
  if (!isLoggedIn || !userEmail) return null;

  const foundUser = users.find((u) => u.email === userEmail);
  if (!foundUser) return null;

  return {
    userKey: foundUser.id,
    userName: foundUser.nickname || foundUser.name || foundUser.email,
    userEmail: foundUser.email,
    userGrade: foundUser.userGrade,
  };
}
