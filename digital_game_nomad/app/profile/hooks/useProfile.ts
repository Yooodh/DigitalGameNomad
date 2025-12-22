// package
import { useState, useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';

// slice
import { UserProfile } from '../types';

// layer
import { useAuthStore } from '@/shared/stores/useAuthStore';
import { useRegisteredUsersStore } from '@/shared/stores/useRegisteredUsersStore';

export function useProfile() {
  const { userEmail: currentUserEmail, isHydrated } = useAuthStore();
  const registeredUsers = useRegisteredUsersStore((state) => state.users);
  const updateUserProfileInStore = useRegisteredUsersStore(
    (state) => state.updateUserProfile
  );

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [editingProfile, setEditingProfile] = useState<UserProfile | null>(
    null
  );
  const [editMode, setEditMode] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!isHydrated) {
      setIsLoading(true);
      return;
    }

    if (!currentUserEmail) {
      setIsLoading(false);
      setProfile(null);
      setEditingProfile(null);
      return;
    }

    const foundUser = registeredUsers.find(
      (user) => user.email === currentUserEmail
    );

    if (foundUser) {
      const getFormattedPhone = (
        phoneArray: string[] | undefined
      ): [string, string, string, string] => {
        if (!phoneArray || phoneArray.length === 0) {
          return ['', '', '', ''];
        }
        if (phoneArray.length === 3) {
          return ['', phoneArray[0], phoneArray[1], phoneArray[2]];
        }
        if (phoneArray.length === 4) {
          return phoneArray as [string, string, string, string];
        }
        return ['', '', '', ''];
      };

      const userProfile: UserProfile = {
        name: foundUser.name || '',
        nickname: foundUser.nickname || '',
        email: foundUser.email,
        phone: getFormattedPhone(foundUser.phone),
        profileImage: foundUser.profileImage || null,
        joinDate: foundUser.joinDate || new Date().toISOString().split('T')[0],
        grade: foundUser.userGrade,
      };

      setProfile(userProfile);
      setEditingProfile(userProfile);
    } else {
      console.error('스토어에서 사용자를 찾을 수 없습니다.');
      toast.error('사용자 정보를 찾을 수 없습니다.');
      setProfile(null);
      setEditingProfile(null);
    }

    setIsLoading(false);
  }, [isHydrated, currentUserEmail, registeredUsers]);

  const handleEdit = useCallback(() => {
    if (profile) {
      setEditingProfile({ ...profile });
      setEditMode(true);
    }
  }, [profile]);

  const handleSave = useCallback(
    async (updatedProfile: UserProfile) => {
      setIsLoading(true);

      try {
        await new Promise<void>((resolve) => setTimeout(resolve, 1000));

        if (currentUserEmail) {
          updateUserProfileInStore(currentUserEmail, {
            name: updatedProfile.name,
            nickname: updatedProfile.nickname,
            phone: updatedProfile.phone,
            profileImage: updatedProfile.profileImage,
            userGrade: updatedProfile.grade,
          });

          setEditMode(false);

          setEditingProfile(updatedProfile);
          setProfile(updatedProfile);
        } else {
          toast.error(
            '로그인된 사용자 정보가 없어 프로필을 업데이트할 수 없습니다.'
          );
        }
      } catch (error) {
        console.error('프로필 업데이트 중 오류 발생:', error);
        toast.error('프로필 업데이트에 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    },
    [currentUserEmail, updateUserProfileInStore]
  );

  const handleCancel = useCallback(() => {
    if (profile) {
      setEditingProfile(profile);
      setEditMode(false);
    }
  }, [profile]);

  return {
    profile,
    editingProfile,
    setEditingProfile,
    editMode,
    isLoading,
    handleEdit,
    handleSave,
    handleCancel,
  };
}
