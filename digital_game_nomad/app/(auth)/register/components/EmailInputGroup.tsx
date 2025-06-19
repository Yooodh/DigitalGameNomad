// slice
import InputGroup from './InputGroup';
import styles from '../styles/Register.module.scss';
import { EmailInputGroupProps } from '../types';

// layer
import { ChevronDown } from '@/shared/icons';

export default function EmailInputGroup({
  email,
  emailDomain,
  isEmailSelectOpen,
  handleInputChange,
  handleEmailDomainChange,
  checkEmailDuplicate,
  validationEmail,
  validationEmailChecked,
  isLoading,
  setIsSelectOpen,
}: EmailInputGroupProps) {
  return (
    <InputGroup
      label='이메일'
      showError={!validationEmail && !!email}
      errorMessage='올바른 이메일 주소 형식을 입력해 주세요.'
      showSuccess={validationEmailChecked}
      successMessage='사용 가능한 이메일입니다.'
    >
      <div className={styles.emailContainer}>
        <div className={styles.emailContainer__inputWrap}>
          <input
            type='text'
            value={email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`${styles.groupContainer__input} ${
              !validationEmail && email ? styles.inputError : ''
            }`}
            placeholder='이메일 주소를 입력해주세요'
            maxLength={50}
          />
        </div>
        <div
          className={`${styles.groupContainer__selectWrap} ${
            isEmailSelectOpen ? styles.groupContainer__selectOpen : ''
          }`}
          onBlur={() => setIsSelectOpen((prev) => ({ ...prev, email: false }))}
        >
          <select
            className={styles.emailContainer__domain}
            value={emailDomain}
            onChange={handleEmailDomainChange}
            onClick={() =>
              setIsSelectOpen((prev) => ({
                ...prev,
                email: !prev.email,
              }))
            }
          >
            <option value=''>선택</option>
            <option value='naver.com'>naver.com</option>
            <option value='gmail.com'>gmail.com</option>
            <option value='daum.net'>daum.net</option>
            <option value='hanmail.net'>hanmail.net</option>
            <option value='kakao.com'>kakao.com</option>
            <option value='nate.com'>nate.com</option>
            <option value='direct'>직접입력</option>
          </select>
          <span className={styles.groupContainer__selectIcon}>
            <ChevronDown />
          </span>
        </div>
        <button
          type='button'
          onClick={checkEmailDuplicate}
          disabled={
            !validationEmail ||
            isLoading ||
            validationEmailChecked ||
            !emailDomain ||
            (emailDomain === 'direct' && !email.includes('@')) ||
            (emailDomain !== 'direct' && !email)
          }
          className={`${styles.groupContainer__btn} ${styles.btnSecondary}`}
        >
          {isLoading ? '확인중...' : '중복확인'}
        </button>
      </div>
    </InputGroup>
  );
}
