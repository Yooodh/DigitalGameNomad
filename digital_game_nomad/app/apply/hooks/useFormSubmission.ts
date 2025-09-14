// package
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

// slice
import { UseFormSubmissionProps } from '../types';

export function useFormSubmission<T>({
  validate,
  onSubmitSuccess,
}: UseFormSubmissionProps<T>) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(
    async (dataToSubmit: T) => {
      if (isSubmitting) return;

      if (!validate(dataToSubmit)) {
        return;
      }

      setIsSubmitting(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));

        if (onSubmitSuccess) {
          await onSubmitSuccess(dataToSubmit);
        }
        alert('신청서가 성공적으로 제출되었습니다.');
        router.push('/participation');
      } catch (error) {
        console.error('제출 중 오류가 발생했습니다:', error);
        alert('신청서 제출 중 오류가 발생했습니다. 다시 시도해 주세요.');
      } finally {
        setIsSubmitting(false);
      }
    },
    [validate, onSubmitSuccess, router, isSubmitting]
  );

  return {
    isSubmitting,
    handleSubmit,
  };
}
