// slice
import InputGroup from './InputGroup';
import styles from '../styles/Register.module.scss';
import { PasswordInputGroupProps } from '../types';

// layer
import { Eye, EyeOff } from '@/shared/icons';

export default function PasswordInputGroup({
  password,
  passwordCheck,
  showPassword,
  showPasswordCheck,
  handleInputChange,
  setShowPassword,
  setShowPasswordCheck,
  validationPassword,
  validationPasswordCheck,
}: PasswordInputGroupProps) {
  return (
    <>
      <InputGroup
        label='비밀번호'
        showError={!validationPassword && !!password}
        errorMessage='비밀번호는 8~16자 영문, 숫자, 특수문자 조합으로 입력해 주세요.'
        showSuccess={false}
      >
        <div className={styles.passwordContainer}>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className={`${styles.groupContainer__input} ${
              !validationPassword ? styles.inputError : ''
            }`}
            placeholder='8~16자 영문+숫자+특수문자 조합'
            maxLength={16}
          />
          <button
            type='button'
            onClick={() => setShowPassword(!showPassword)}
            className={styles.passwordContainer__toggle}
          >
            {showPassword ? (
              <span className={styles.toggleIcon}>
                <EyeOff />
              </span>
            ) : (
              <span className={styles.toggleIcon}>
                <Eye />
              </span>
            )}
          </button>
        </div>
      </InputGroup>

      <InputGroup
        label='비밀번호 확인'
        showError={!validationPasswordCheck && !!passwordCheck}
        errorMessage='비밀번호가 일치하지 않습니다.'
        showSuccess={false}
      >
        <div className={styles.passwordContainer}>
          <input
            type={showPasswordCheck ? 'text' : 'password'}
            value={passwordCheck}
            onChange={(e) => handleInputChange('passwordCheck', e.target.value)}
            className={`${styles.groupContainer__input} ${
              !validationPasswordCheck ? styles.inputError : ''
            }`}
            placeholder='비밀번호를 다시 입력해 주세요.'
            maxLength={16}
          />
          <button
            type='button'
            onClick={() => setShowPasswordCheck(!showPasswordCheck)}
            className={styles.passwordContainer__toggle}
          >
            {showPasswordCheck ? (
              <span className={styles.passwordContainer__toggleIcon}>
                <EyeOff />
              </span>
            ) : (
              <span className={styles.passwordContainer__toggleIcon}>
                <Eye />
              </span>
            )}
          </button>
        </div>
      </InputGroup>
    </>
  );
}
