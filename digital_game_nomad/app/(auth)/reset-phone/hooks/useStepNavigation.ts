// package
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

// layer
import { UseStepNavigationReturn } from '../types';

export function useStepNavigation(): UseStepNavigationReturn {
  const router = useRouter();
  const [step, setStep] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 1500));

      setIsLoading(false);
      if (step < 4) {
        setStep((prev) => prev + 1);
      }
    },
    [step]
  );

  const handlePrevStep = useCallback(
    (
      resetEmailVerification: () => void,
      resetPhoneVerification: () => void
    ) => {
      if (step === 2) {
        setStep(1);
        resetEmailVerification();
      } else if (step === 3) {
        setStep(2);
        resetPhoneVerification();
      }
    },
    [step]
  );

  const handleCompletionAndRedirect = useCallback(() => {
    router.push('/profile');
  }, [router]);

  return {
    step,
    setStep,
    handleSubmit,
    handlePrevStep,
    handleCompletionAndRedirect,
    isLoading,
    setIsLoading,
  };
}
