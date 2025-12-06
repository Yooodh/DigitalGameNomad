// package
import { toast } from 'react-toastify';

// slice
import { useFormData } from './useFormData';
import { useImageUpload } from './useImageUpload';
import { useFormSubmission } from './useFormSubmission';
import { FormData } from '../types';

// layer
import { useApplicationsStore } from '@/shared/stores/useApplicationsStore';
import { useAuthStore } from '@/shared/stores/useAuthStore';
import { useRegisteredUsersStore } from '@/shared/stores/useRegisteredUsersStore';

export function useApplyForm() {
  const addApplication = useApplicationsStore((state) => state.addApplication);
  const {
    isLoggedIn,
    userEmail: currentUserEmail,
    userGrade,
    isHydrated,
  } = useAuthStore();
  const login = useAuthStore((state) => state.login);

  const updateUserProfileInStore = useRegisteredUsersStore(
    (state) => state.updateUserProfile
  );

  const { formData, handleInputChange } = useFormData({
    companyName: '',
    gameName: '',
    description: '',
    gameUrl: '',
    youtubeUrl: '',
  });

  const {
    previewImage,
    imageFile,
    isDragging,
    handleImageChange,
    removeImage,
    handleDrop,
    handleDragOver,
    handleDragLeave,
  } = useImageUpload();

  const validateApplyForm = (data: FormData): boolean => {
    if (!isHydrated) {
      toast.error(
        '사용자 정보를 불러오는 중입니다. 잠시 후 다시 시도해 주세요.'
      );
      return false;
    }
    if (!data.companyName.trim()) {
      toast.warning('기업 이름을 입력해주세요.');
      return false;
    }
    if (!data.gameName.trim()) {
      toast.warning('게임 이름을 입력해주세요.');
      return false;
    }
    if (!data.description.trim()) {
      toast.warning('전시 내용을 입력해주세요.');
      return false;
    }
    if (!data.gameUrl.trim()) {
      toast.warning('게임 URL을 입력해주세요.');
      return false;
    }

    if (!currentUserEmail || !isLoggedIn) {
      toast.info('로그인 후 이용해 주세요.');
      return false;
    }

    if (userGrade && userGrade === 3) {
      updateUserProfileInStore(currentUserEmail, { userGrade: 2 });
    }
    return true;
  };

  const { isSubmitting, handleSubmit: submitForm } = useFormSubmission<
    FormData & { imageFile?: File | null }
  >({
    validate: (data) => validateApplyForm(data),
    onSubmitSuccess: async (submittedData) => {
      try {
        await addApplication({
          companyName: submittedData.companyName,
          gameName: submittedData.gameName,
          description: submittedData.description,
          gameUrl: submittedData.gameUrl,
          youtubeUrl: submittedData.youtubeUrl,
          imageFile: submittedData.imageFile,
          applicantEmail: currentUserEmail!,
        });

        if (currentUserEmail && userGrade === 3) {
          login(2, currentUserEmail!);
          updateUserProfileInStore(currentUserEmail, {
            userGrade: 2,
          });
        }
      } catch (error) {
        toast.error('신청서 저장 중 오류가 발생했습니다.');
        throw error;
      }
    },
  });

  const handleFinalSubmit = () => {
    const dataToSubmit = {
      ...formData,
      imageFile: imageFile,
    };
    submitForm(dataToSubmit);
  };

  return {
    formData,
    previewImage,
    isDragging,
    handleInputChange,
    handleImageChange,
    removeImage,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleSubmit: handleFinalSubmit,
    isSubmitting,
  };
}
