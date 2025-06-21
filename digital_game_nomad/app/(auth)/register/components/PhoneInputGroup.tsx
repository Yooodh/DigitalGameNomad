// slice
import InputGroup from './InputGroup';
import styles from '../styles/Register.module.scss';
import { PhoneInputGroupProps } from '../types';

// layer
import { ChevronDown } from '@/shared/icons';

export default function PhoneInputGroup({
  phone,
  verificationCode,
  showVerification,
  isCarrierSelectOpen,
  validationPhone,
  validationPhoneVerified,
  handleInputChange,
  handleCarrierChange,
  requestVerification,
  verifyPhone,
  setVerificationCode,
  setIsSelectOpen,
}: PhoneInputGroupProps) {
  return (
    <InputGroup
      label='전화번호'
      showError={!validationPhone && phone.join('') !== ''}
      errorMessage='유효한 전화번호 11자리를 입력해 주세요.'
      showSuccess={validationPhoneVerified}
      successMessage='전화번호 인증이 완료되었습니다'
    >
      <div className={styles.phoneContainer}>
        <div
          className={`${styles.groupContainer__selectWrap} ${
            isCarrierSelectOpen ? styles.groupContainer__selectOpen : ''
          }`}
          onBlur={() =>
            setIsSelectOpen((prev) => ({ ...prev, carrier: false }))
          }
        >
          <select
            className={styles.phoneContainer__select}
            onChange={handleCarrierChange}
            onClick={() =>
              setIsSelectOpen((prev) => ({
                ...prev,
                carrier: !prev.carrier,
              }))
            }
          >
            <option>통신사 선택</option>
            <option value='SKT'>SKT</option>
            <option value='KT'>KT</option>
            <option value='LG'>LG U+</option>
            <option value='알뜰'>알뜰폰</option>
          </select>
          <span className={styles.groupContainer__selectIcon}>
            <ChevronDown />
          </span>
        </div>

        <div className={styles.phoneContainer__inputs}>
          <input
            type='text'
            value={phone[0]}
            onChange={(e) => handleInputChange('phone', e.target.value, 0)}
            className={styles.phoneContainer__input}
            placeholder='010'
            maxLength={3}
          />
          <span className={styles.phoneContainer__separator}>-</span>
          <input
            type='text'
            value={phone[1]}
            onChange={(e) => handleInputChange('phone', e.target.value, 1)}
            className={styles.phoneContainer__input}
            placeholder='1234'
            maxLength={4}
          />
          <span className={styles.phoneContainer__separator}>-</span>
          <input
            type='text'
            value={phone[2]}
            onChange={(e) => handleInputChange('phone', e.target.value, 2)}
            className={styles.phoneContainer__input}
            placeholder='5678'
            maxLength={4}
          />
          <button
            type='button'
            onClick={requestVerification}
            disabled={!validationPhone || validationPhoneVerified}
            className={`${styles.groupContainer__btn} ${styles.btnSuccess}`}
          >
            {validationPhoneVerified ? '인증완료' : '인증'}
          </button>
        </div>

        {showVerification && (
          <div className={styles.verificationContainer}>
            <input
              type='text'
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className={styles.groupContainer__input}
              placeholder='인증번호 4자리'
              maxLength={4}
            />
            <button
              type='button'
              onClick={verifyPhone}
              className={`${styles.groupContainer__btn} ${styles.btnPrimary}`}
            >
              확인
            </button>
          </div>
        )}
      </div>
    </InputGroup>
  );
}
