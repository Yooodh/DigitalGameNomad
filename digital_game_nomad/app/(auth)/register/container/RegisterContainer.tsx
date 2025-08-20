'use client';

// slice
import RegisterPresenter from '../presenter/RegisterPresenter';
import { useRegisterForm } from '../hooks/useRegisterForm';

export default function RegisterContainer() {
  const {
    formData,
    validation,
    showPassword,
    showPasswordCheck,
    verificationCode,
    showVerification,
    isLoading,
    emailDomain,
    isSelectOpen,
    handleInputChange,
    handleEmailDomainChange,
    handleCarrierChange,
    checkEmailDuplicate,
    requestVerification,
    verifyPhone,
    handleSubmit,
    setShowPassword,
    setShowPasswordCheck,
    setVerificationCode,
    setIsSelectOpen,
  } = useRegisterForm();

  return (
    <RegisterPresenter
      formData={formData}
      validation={validation}
      showPassword={showPassword}
      showPasswordCheck={showPasswordCheck}
      verificationCode={verificationCode}
      showVerification={showVerification}
      isLoading={isLoading}
      emailDomain={emailDomain}
      isSelectOpen={isSelectOpen}
      handleInputChange={handleInputChange}
      handleEmailDomainChange={handleEmailDomainChange}
      handleCarrierChange={handleCarrierChange}
      checkEmailDuplicate={checkEmailDuplicate}
      requestVerification={requestVerification}
      verifyPhone={verifyPhone}
      handleSubmit={handleSubmit}
      setShowPassword={setShowPassword}
      setShowPasswordCheck={setShowPasswordCheck}
      setVerificationCode={setVerificationCode}
      setIsSelectOpen={setIsSelectOpen}
    />
  );
}
