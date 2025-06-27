// slice
import { useFormData } from './useFormData';
import { useImageUpload } from './useImageUpload';
import { useFormSubmission } from './useFormSubmission';
import { FormData } from '../types';

export function useApplyForm() {
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
    if (!data.companyName.trim()) {
      alert('기업 이름을 입력해주세요.');
      return false;
    }
    if (!data.gameName.trim()) {
      alert('게임 이름을 입력해주세요.');
      return false;
    }
    if (!data.description.trim()) {
      alert('전시 내용을 입력해주세요.');
      return false;
    }
    if (!data.gameUrl.trim()) {
      alert('게임 URL을 입력해주세요.');
      return false;
    }
    return true;
  };

  const { isSubmitting, handleSubmit: submitForm } = useFormSubmission<
    FormData & { image?: File }
  >({
    validate: (data) => validateApplyForm(data),
    onSubmitSuccess: (submittedData) => {
      console.log('Apply form submission success callback:', submittedData);
    },
  });

  const handleFinalSubmit = () => {
    const dataToSubmit = {
      ...formData,
      ...(imageFile && { image: imageFile }),
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
