'use client';

// slice
import Header from '../components/Header';
import InputGroup from '../components/InputGroup';
import EmailInputGroup from '../components/EmailInputGroup';
import PasswordInputGroup from '../components/PasswordInputGroup';
import PhoneInputGroup from '../components/PhoneInputGroup';
import Footer from '../components/Footer';
import styles from '../styles/Register.module.scss';
import { RegisterPresenterProps } from '../types';

export default function RegisterPresenter({
  formData,
  validation,
  showPassword,
  showPasswordCheck,
  verificationCode,
  showVerification,
  isLoading,
  emailDomain,
  isSelectOpen,
  handleInputChange,
  handleEmailDomainChange,
  handleCarrierChange,
  checkEmailDuplicate,
  requestVerification,
  verifyPhone,
  handleSubmit,
  setShowPassword,
  setShowPasswordCheck,
  setVerificationCode,
  setIsSelectOpen,
}: RegisterPresenterProps) {
  return (
    <div className={styles.registerContainer}>
      <div className={styles.formContainer}>
        <Header />

        <div className={styles.cardContainer}>
          <div className={styles.contentContainer}>
            <EmailInputGroup
              email={formData.email}
              emailDomain={emailDomain}
              isEmailSelectOpen={isSelectOpen.email}
              handleInputChange={handleInputChange}
              handleEmailDomainChange={handleEmailDomainChange}
              checkEmailDuplicate={checkEmailDuplicate}
              validationEmail={validation.email}
              validationEmailChecked={validation.emailChecked}
              isLoading={isLoading}
              setIsSelectOpen={setIsSelectOpen}
            />

            <InputGroup
              label='닉네임'
              showError={!validation.nickname && !!formData.nickname}
              errorMessage='한글, 영문, 숫자만 입력 가능하며 10자 이내로 입력해 주세요.'
              showSuccess={false}
            >
              <input
                type='text'
                value={formData.nickname}
                onChange={(e) => handleInputChange('nickname', e.target.value)}
                className={`${styles.groupContainer__input} ${
                  !validation.nickname && formData.nickname
                    ? styles.inputError
                    : ''
                }`}
                placeholder='닉네임을 입력해주세요 (한글, 영문, 숫자 10자 이내)'
                maxLength={10}
              />
            </InputGroup>

            <PasswordInputGroup
              password={formData.password}
              passwordCheck={formData.passwordCheck}
              showPassword={showPassword}
              showPasswordCheck={showPasswordCheck}
              handleInputChange={handleInputChange}
              setShowPassword={setShowPassword}
              setShowPasswordCheck={setShowPasswordCheck}
              validationPassword={validation.password}
              validationPasswordCheck={validation.passwordCheck}
            />

            <InputGroup
              label='이름'
              showError={!validation.name && !!formData.name}
              errorMessage='한글이나 영문으로 입력해 주세요'
              showSuccess={false}
            >
              <input
                type='text'
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`${styles.groupContainer__input} ${
                  !validation.name ? styles.inputError : ''
                }`}
                placeholder='이름을 입력해주세요'
                maxLength={10}
              />
            </InputGroup>

            <PhoneInputGroup
              phone={formData.phone}
              verificationCode={verificationCode}
              showVerification={showVerification}
              isLoading={isLoading}
              isCarrierSelectOpen={isSelectOpen.carrier}
              validationPhone={validation.phone}
              validationPhoneVerified={validation.phoneVerified}
              handleInputChange={handleInputChange}
              handleCarrierChange={handleCarrierChange}
              requestVerification={requestVerification}
              verifyPhone={verifyPhone}
              setVerificationCode={setVerificationCode}
              setIsSelectOpen={setIsSelectOpen}
            />

            <button
              type='button'
              onClick={handleSubmit}
              className={`${styles.groupContainer__btn} ${styles.btnSubmit}`}
              disabled={
                !validation.email ||
                !validation.emailChecked ||
                !validation.password ||
                !validation.passwordCheck ||
                !validation.name ||
                !validation.nickname ||
                !validation.phone ||
                !validation.phoneVerified ||
                isLoading
              }
            >
              회원가입
            </button>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
}
