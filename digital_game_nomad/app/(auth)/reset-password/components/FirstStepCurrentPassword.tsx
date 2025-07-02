// slice
import styles from '../styles/ResetPassword.module.scss';
import { FirstStepCurrentPasswordProps } from '../types';

// layer
import PasswordToggleButton from '@/shared/components/PasswordToggleButton/PasswordToggleButton';
import { Warning } from '@/shared/icons';

export default function FirstStepCurrentPassword({
  formData,
  isLoading,
  currentPasswordError,
  showCurrentPassword,
  handleInputChange,
  togglePasswordVisibility,
}: FirstStepCurrentPasswordProps) {
  return (
    <div className={styles.stepContainer}>
      <h2 className={styles.stepContainer__title}>비밀번호 변경</h2>
      <p className={styles.stepContainer__desc}>
        본인 확인을 위해 현재 비밀번호를 입력해주세요.
      </p>
      <div className={styles.inputContainer}>
        <label className={styles.inputContainer__label}>현재 비밀번호</label>
        <div className={styles.inputContainer__wrap}>
          <input
            type={showCurrentPassword ? 'text' : 'password'}
            name='currentPassword'
            value={formData.currentPassword}
            onChange={handleInputChange}
            placeholder='현재 비밀번호 입력'
            className={`${styles.inputContainer__input} ${
              currentPasswordError ? styles.inputContainer__error : ''
            }`}
            autoFocus
          />
          <PasswordToggleButton
            showPassword={showCurrentPassword}
            togglePasswordVisibility={togglePasswordVisibility}
          />
        </div>
        {currentPasswordError && (
          <div className={styles.inputContainer__errorMessage}>
            <svg
              className={styles.inputContainer__errorIcon}
              viewBox='0 0 24 21'
            >
              <Warning />
            </svg>
            {currentPasswordError}
          </div>
        )}
      </div>
      <button
        type='submit'
        disabled={!formData.currentPassword || isLoading}
        className={`${styles.btn} ${styles.primary}`}
      >
        {isLoading ? <span className={styles.btn__loader}></span> : '다음'}
      </button>
    </div>
  );
}
