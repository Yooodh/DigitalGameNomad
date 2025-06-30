'use client';

// slice
import ProgressBar from '../components/ProgressBar';
import FirstStepEmailVerification from '../components/FirstStepEmailVerification';
import SecondStepPersonalInfo from '../components/SecondStepPersonalInfo';
import ThirdStepNewPhoneInput from '../components/ThirdStepNewPhoneInput';
import FourthStepCompletion from '../components/FourthStepCompletion';
import styles from '../styles/ResetPhone.module.scss';
import { ResetPhonePresenterProps } from '../types';

export default function ResetPhonePresenter({
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
}: ResetPhonePresenterProps) {
  return (
    <div className={styles.resetPhoneContainer}>
      <div className={styles.cardContainer}>
        <div className={styles.headerContainer}>
          <h1 className={styles.headerContainer__title}>전화번호 변경</h1>
          <ProgressBar currentStep={step} totalSteps={4} />
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {step === 1 && (
            <FirstStepEmailVerification
              formData={formData}
              isLoading={isLoading}
              isEmailCodeSent={isEmailCodeSent}
              emailCountdown={emailCountdown}
              emailError={emailError}
              emailCodeError={emailCodeError}
              handleInputChange={handleInputChange}
              sendEmailVerificationCode={sendEmailVerificationCode}
              formatTime={formatTime}
              validateVerificationCode={validateVerificationCode}
            />
          )}
          {step === 2 && (
            <SecondStepPersonalInfo
              formData={formData}
              isLoading={isLoading}
              isCurrentCarrierSelectOpen={isCurrentCarrierSelectOpen}
              carriers={carriers}
              handleInputChange={handleInputChange}
              handleSelectFocus={handleSelectFocus}
              handleSelectBlur={handleSelectBlur}
              handlePrevStep={handlePrevStep}
            />
          )}
          {step === 3 && (
            <ThirdStepNewPhoneInput
              formData={formData}
              isLoading={isLoading}
              isPhoneCodeSent={isPhoneCodeSent}
              phoneCountdown={phoneCountdown}
              phoneCodeError={phoneCodeError}
              isNewCarrierSelectOpen={isNewCarrierSelectOpen}
              carriers={carriers}
              handleInputChange={handleInputChange}
              handleSelectFocus={handleSelectFocus}
              handleSelectBlur={handleSelectBlur}
              sendPhoneVerificationCode={sendPhoneVerificationCode}
              formatTime={formatTime}
              validateVerificationCode={validateVerificationCode}
              handlePrevStep={handlePrevStep}
            />
          )}
          {step === 4 && (
            <FourthStepCompletion
              formData={formData}
              handleCompletionAndRedirect={handleCompletionAndRedirect}
            />
          )}
        </form>
      </div>
    </div>
  );
}
