// slice
import PhoneInputGroup from './PhoneInputGroup';
import InfoDisplay from './InfoDisplay';
import VerificationCode from './VerificationCode';
import styles from '../styles/ResetPhone.module.scss';
import { ThirdStepNewPhoneInputProps } from '../types';

export default function ThirdStepNewPhoneInput({
  formData,
  isLoading,
  isPhoneCodeSent,
  phoneCountdown,
  phoneCodeError,
  isNewCarrierSelectOpen,
  carriers,
  handleInputChange,
  handleSelectFocus,
  handleSelectBlur,
  sendPhoneVerificationCode,
  formatTime,
  validateVerificationCode,
  handlePrevStep,
}: ThirdStepNewPhoneInputProps) {
  const successMessage = `[${formData.newCarrier}] ${formData.newPhone}로 인증번호가 발송되었습니다`;

  return (
    <div className={styles.stepContainer}>
      <h2 className={styles.stepContainer__title}>새 전화번호 입력</h2>
      <p className={styles.stepContainer__desc}>
        변경할 새로운 전화번호를 입력하고 인증받아주세요
      </p>

      <InfoDisplay
        items={[
          { label: '이름', value: formData.name },
          {
            label: '현재 번호',
            value: `[${formData.currentCarrier}] ${formData.currentPhone}`,
          },
        ]}
      />

      <PhoneInputGroup
        label='새 전화번호'
        phoneName='newPhone'
        phoneValue={formData.newPhone}
        carrierName='newCarrier'
        carrierValue={formData.newCarrier}
        carriers={carriers}
        isSelectOpen={isNewCarrierSelectOpen}
        onChange={handleInputChange}
        onSelectFocus={() => handleSelectFocus('newCarrier')}
        onSelectBlur={() => handleSelectBlur('newCarrier')}
        placeholder='010-0000-0000'
      />

      {!isPhoneCodeSent ? (
        <div className={styles.btnContainer}>
          <button
            type='button'
            onClick={handlePrevStep}
            className={`${styles.btn} ${styles.secondary}`}
          >
            이전
          </button>
          <button
            type='button'
            onClick={sendPhoneVerificationCode}
            disabled={
              !formData.newPhone || formData.newCarrier === '' || isLoading
            }
            className={`${styles.btn} ${styles.primary}`}
          >
            {isLoading ? (
              <span className={styles.btn__loader}></span>
            ) : (
              '인증번호 발송'
            )}
          </button>
        </div>
      ) : (
        <>
          <VerificationCode
            label='인증번호'
            name='phoneVerificationCode'
            value={formData.phoneVerificationCode}
            error={phoneCodeError}
            countdown={phoneCountdown}
            isCodeSent={isPhoneCodeSent}
            isLoading={isLoading}
            onChange={handleInputChange}
            onResendCode={sendPhoneVerificationCode}
            formatTime={formatTime}
            validateVerificationCode={validateVerificationCode}
            successMessage={successMessage}
          />

          <div className={styles.btnContainer}>
            <button
              type='button'
              onClick={handlePrevStep}
              className={`${styles.btn} ${styles.secondary}`}
            >
              이전
            </button>
            <button
              type='submit'
              disabled={
                !validateVerificationCode(formData.phoneVerificationCode) ||
                phoneCodeError !== '' ||
                isLoading
              }
              className={`${styles.btn} ${styles.primary}`}
            >
              {isLoading ? (
                <span className={styles.btn__loader}></span>
              ) : (
                '인증 완료'
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
