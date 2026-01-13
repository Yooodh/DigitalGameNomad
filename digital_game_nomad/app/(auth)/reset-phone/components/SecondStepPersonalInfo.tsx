// slice
import InputGroup from './InputGroup';
import PhoneInputGroup from './PhoneInputGroup';
import styles from '../styles/ResetPhone.module.scss';
import { SecondStepPersonalInfoProps } from '../types';

// layer
import { Warning } from '@/shared/icons';

export default function SecondStepPersonalInfo({
  formData,
  isLoading,
  isCurrentCarrierSelectOpen,
  carriers,
  handleInputChange,
  handleSelectFocus,
  handleSelectBlur,
  handlePrevStep,
  personalInfoError,
}: SecondStepPersonalInfoProps) {
  return (
    <div className={styles.stepContainer}>
      <h2 className={styles.stepContainer__title}>본인 정보 확인</h2>
      <p className={styles.stepContainer__desc}>
        본인 확인을 위해 이름과 현재 전화번호를 입력해 주세요.
      </p>

      <InputGroup
        label='이름'
        name='name'
        value={formData.name}
        onChange={handleInputChange}
        placeholder='홍길동'
      />

      <PhoneInputGroup
        label='현재 전화번호'
        phoneName='currentPhone'
        phoneValue={formData.currentPhone}
        carrierName='currentCarrier'
        carrierValue={formData.currentCarrier}
        carriers={carriers}
        isSelectOpen={isCurrentCarrierSelectOpen}
        onChange={handleInputChange}
        onSelectFocus={() => handleSelectFocus('currentCarrier')}
        onSelectBlur={() => handleSelectBlur('currentCarrier')}
        placeholder='010-0000-0000'
      />

      {personalInfoError && (
        <div className={styles.inputContainer__errorMessage}>
          <svg className={styles.inputContainer__errorIcon} viewBox='0 0 24 21'>
            <Warning />
          </svg>
          {personalInfoError}
        </div>
      )}

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
            !formData.name ||
            !formData.currentPhone ||
            formData.currentCarrier === '' ||
            isLoading
          }
          className={`${styles.btn} ${styles.primary}`}
        >
          {isLoading ? <span className={styles.btn__loader}></span> : '다음'}
        </button>
      </div>
    </div>
  );
}
