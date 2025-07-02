// slice
import InputField from './InputField';
import StrengthBar from './StrengthBar';
import Requirements from './Requirements';
import styles from '../styles/ResetPassword.module.scss';
import { SecondStepNewPasswordProps } from '../types';

export default function SecondStepNewPassword({
  formData,
  isLoading,
  passwordError,
  confirmPasswordError,
  showNewPassword,
  showConfirmPassword,
  handleInputChange,
  togglePasswordVisibility,
  passwordStrength,
  handlePrev,
}: SecondStepNewPasswordProps) {
  return (
    <div className={styles.stepContainer}>
      <h2 className={styles.stepContainer__title}>새 비밀번호 설정</h2>
      <p className={styles.stepContainer__desc}>
        새로운 비밀번호를 입력해주세요
      </p>

      <InputField
        label='새 비밀번호'
        name='newPassword'
        value={formData.newPassword}
        showPassword={showNewPassword}
        onChange={handleInputChange}
        onTogglePassword={() => togglePasswordVisibility('new')}
        placeholder='새 비밀번호 입력'
        error={passwordError}
      />

      <InputField
        label='비밀번호 확인'
        name='confirmPassword'
        value={formData.confirmPassword}
        showPassword={showConfirmPassword}
        onChange={handleInputChange}
        onTogglePassword={() => togglePasswordVisibility('confirm')}
        placeholder='비밀번호 재입력'
        error={confirmPasswordError}
      />

      {formData.newPassword && (
        <StrengthBar
          strength={passwordStrength.strength}
          label={passwordStrength.label}
          color={passwordStrength.color}
        />
      )}

      <Requirements password={formData.newPassword} />

      <div className={styles.btnContainer}>
        <button
          type='button'
          onClick={handlePrev}
          className={`${styles.btn} ${styles.secondary}`}
        >
          이전
        </button>
        <button
          type='submit'
          disabled={
            !formData.newPassword ||
            !formData.confirmPassword ||
            passwordError !== '' ||
            confirmPasswordError !== '' ||
            isLoading
          }
          className={`${styles.btn} ${styles.primary}`}
        >
          {isLoading ? (
            <span className={styles.btn__loader}></span>
          ) : (
            '비밀번호 변경'
          )}
        </button>
      </div>
    </div>
  );
}
