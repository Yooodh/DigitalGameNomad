'use client';

// slice
import ResetPhonePresenter from '../presenters/ResetPhone.presenter';
import { useResetPhoneForm } from '../hooks/useResetPhoneForm';
import { useStepNavigation } from '../hooks/useStepNavigation';
import { usePhoneVerification } from '../hooks/usePhoneVerification';
import { useEmailVerification } from '../hooks/useEmailVerification';
import { useValidationUtils } from '../hooks/useValidationUtils';

export default function ResetPhoneContainer() {
  const {
    formData,
    setFormData,
    handleInputChange,
    emailError,
    setEmailError,
    emailCodeError,
    setEmailCodeError,
    phoneCodeError,
    setPhoneCodeError,
    isCurrentCarrierSelectOpen,
    isNewCarrierSelectOpen,
    carriers,
    handleSelectFocus,
    handleSelectBlur,
  } = useResetPhoneForm();

  const {
    step,

    isLoading,
    setIsLoading,
    handleSubmit: handleStepSubmit,
    handlePrevStep: handleStepPrev,
    handleCompletionAndRedirect,
  } = useStepNavigation();

  const {
    isEmailCodeSent,
    emailCountdown,
    sendEmailVerificationCode: sendEmailCode,
    resetEmailVerification,
  } = useEmailVerification();

  const {
    isPhoneCodeSent,
    phoneCountdown,
    sendPhoneVerificationCode: sendPhoneCode,
    resetPhoneVerification,
  } = usePhoneVerification();

  const { validateVerificationCode, formatTime } = useValidationUtils();

  const sendEmailVerificationCode = async () => {
    await sendEmailCode(formData.email, setIsLoading, setEmailError);
  };

  const sendPhoneVerificationCode = async () => {
    await sendPhoneCode(setIsLoading);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    await handleStepSubmit(e);

    if (
      step === 1 &&
      !validateVerificationCode(formData.emailVerificationCode)
    ) {
      setEmailCodeError(emailCodeError || '유효하지 않은 인증번호입니다.');
      setIsLoading(false);
      return;
    }
    if (
      step === 3 &&
      !validateVerificationCode(formData.phoneVerificationCode)
    ) {
      setPhoneCodeError(phoneCodeError || '유효하지 않은 인증번호입니다.');
      setIsLoading(false);
      return;
    }
  };

  const handlePrevStep = () => {
    handleStepPrev(
      () => {
        resetEmailVerification();
        setEmailCodeError('');
        setFormData((prev) => ({ ...prev, emailVerificationCode: '' }));
      },
      () => {
        resetPhoneVerification();
        setPhoneCodeError('');
        setFormData((prev) => ({ ...prev, phoneVerificationCode: '' }));
      }
    );
  };

  const presenterProps = {
    formData,
    step,
    isLoading,
    isEmailCodeSent,
    isPhoneCodeSent,
    emailCountdown,
    phoneCountdown,
    emailError,
    emailCodeError,
    phoneCodeError,
    isCurrentCarrierSelectOpen,
    isNewCarrierSelectOpen,
    carriers,
    handleInputChange,
    handleSelectFocus,
    handleSelectBlur,
    sendEmailVerificationCode,
    sendPhoneVerificationCode,
    formatTime,
    handleSubmit,
    handleCompletionAndRedirect,
    validateVerificationCode,
    handlePrevStep,
  };

  return <ResetPhonePresenter {...presenterProps} />;
}
