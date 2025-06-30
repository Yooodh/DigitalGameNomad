// slice
import InputGroup from './InputGroup';
import styles from '../styles/ResetPhone.module.scss';
import { VerificationCodeProps } from '../types';

// layer
import { Check } from '@/shared/icons';

export default function VerificationCode({
  label,
  name,
  value,
  error,
  countdown,
  isCodeSent,
  isLoading,
  successMessage,
  onChange,
  onResendCode,
  formatTime,
}: VerificationCodeProps) {
  return (
    <>
      <InputGroup
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        placeholder='6자리 숫자 입력'
        error={error}
        maxLength={6}
        inputMode='numeric'
        autoFocus
        countdown={countdown}
        formatTime={formatTime}
      />

      {countdown === 0 && (
        <button
          type='button'
          onClick={onResendCode}
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

      {isCodeSent && !isLoading && successMessage && (
        <div className={styles.stepContainer__successMessage}>
          <svg className={styles.stepContainer__checkIcon} viewBox='0 0 24 21'>
            <Check />
          </svg>
          {successMessage}
        </div>
      )}
    </>
  );
}
