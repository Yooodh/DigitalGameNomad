// package
import { useState, useCallback } from 'react';

// slice
import { UserProfile } from '../types';

export function useProfile() {
  const [profile, setProfile] = useState<UserProfile>({
    name: '김철수',
    nickname: '해피코더',
    email: 'kimcs@naver.com',
    phone: ['010', '1234', '5678'],
    profileImage: '',
    joinDate: '2024-01-15',
    grade: 3,
  });

  const [editingProfile, setEditingProfile] = useState<UserProfile>(profile);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleEdit = useCallback(() => {
    setEditingProfile({ ...profile });
    setEditMode(true);
  }, [profile]);

  const handleSave = useCallback(async (updatedProfile: UserProfile) => {
    setIsLoading(true);

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setProfile({ ...updatedProfile });
        setEditMode(false);
        setIsLoading(false);
        alert('프로필이 성공적으로 업데이트되었습니다!');
        resolve();
      }, 1000);
    });
  }, []);

  const handleCancel = useCallback(() => {
    setEditingProfile({ ...profile });
    setEditMode(false);
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
