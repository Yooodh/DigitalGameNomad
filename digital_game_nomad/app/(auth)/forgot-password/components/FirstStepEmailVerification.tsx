// slice
import InputGroup from './InputGroup';
import styles from '../styles/ForgotPassword.module.scss';
import { FirstStepEmailVerificationProps } from '../types';

// layer
import { Check } from '@/shared/icons';

export default function FirstStepEmailVerification({
  formData,
  isLoading,
  isEmailCodeSent,
  emailCountdown,
  emailError,
  emailCodeError,
  handleInputChange,
  sendEmailVerificationCode,
  formatTime,
  validateVerificationCode,
}: FirstStepEmailVerificationProps) {
  return (
    <div className={styles.stepContainer}>
      <h2 className={styles.stepContainer__title}>이메일 인증</h2>
      <p className={styles.stepContainer__desc}>
        본인 확인을 위해 등록된 이메일로 인증번호를 발송합니다.
      </p>

      <InputGroup
        label='이메일'
        name='email'
        type='email'
        value={formData.email}
        onChange={handleInputChange}
        placeholder='example@email.com'
        error={emailError}
      />

      {!isEmailCodeSent ? (
        <button
          type='button'
          onClick={sendEmailVerificationCode}
          disabled={!formData.email || emailError !== '' || isLoading}
          className={`${styles.btn} ${styles.primary}`}
        >
          {isLoading ? (
            <span className={styles.btn__loader}></span>
          ) : (
            '인증번호 발송'
          )}
        </button>
      ) : (
        <>
          <InputGroup
            label='인증번호'
            name='emailVerificationCode'
            value={formData.emailVerificationCode}
            onChange={handleInputChange}
            placeholder='6자리 숫자 입력'
            error={emailCodeError}
            maxLength={6}
            inputMode='numeric'
            autoFocus
            countdown={emailCountdown}
            formatTime={formatTime}
          />
          {isEmailCodeSent && !isLoading && (
            <div className={styles.stepContainer__successMessage}>
              <svg
                className={styles.stepContainer__checkIcon}
                viewBox='0 0 24 21'
              >
                <Check />
              </svg>
              {formData.email}로 인증번호가 발송되었습니다.
            </div>
          )}

          {emailCountdown === 0 && (
            <button
              type='button'
              onClick={sendEmailVerificationCode}
              disabled={isLoading}
              className={`${styles.btn} ${styles.resend}`}
            >
              {isLoading ? (
                <span className={styles.btn__loader}></span>
              ) : (
                '인증번호 재발송'
              )}
            </button>
          )}

          <button
            type='submit'
            disabled={
              !validateVerificationCode(formData.emailVerificationCode) ||
              emailCodeError !== '' ||
              isLoading
            }
            className={`${styles.btn} ${styles.primary}`}
          >
            {isLoading ? (
              <span className={styles.btn__loader}></span>
            ) : (
              '이메일 인증 완료'
            )}
          </button>
        </>
      )}
    </div>
  );
}
