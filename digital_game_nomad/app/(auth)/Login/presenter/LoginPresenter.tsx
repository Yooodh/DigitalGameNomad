'use client';

// slice
import styles from '../styles/Login.module.scss';
import FormInput from '../components/FormInput';
import LoginHeader from '../components/LoginHeader';
import Options from '../components/Options';
import SubmitBtn from '../components/SubmitBtn';
import LoginFooter from '../components/LoginFooter';
import { LoginPresenterProps } from '../types';

// layer
import { Mail, Lock, Eye, EyeOff } from '@/shared/icons';

export default function LoginPresenter({
  formData,
  errors,
  showPassword,
  isLoading,
  handleInputChange,
  handleSubmit,
  togglePasswordVisibility,
}: LoginPresenterProps) {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.cardContainer}>
        <LoginHeader />

        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <FormInput
            icon={Mail}
            type='email'
            name='email'
            placeholder='이메일 주소'
            value={formData.email}
            onChange={handleInputChange}
            errorMessage={errors.email}
          />

          <FormInput
            icon={Lock}
            type={showPassword ? 'text' : 'password'}
            name='password'
            placeholder='비밀번호'
            value={formData.password}
            onChange={handleInputChange}
            errorMessage={errors.password}
          >
            <button
              type='button'
              onClick={togglePasswordVisibility}
              className={styles.formContainer__eyeButton}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </FormInput>

          <Options />
          <SubmitBtn isLoading={isLoading} />
          {errors.general && (
            <span className={styles.formContainer__errorMessage}>
              {errors.general}
            </span>
          )}
        </form>
        <LoginFooter />
      </div>
    </div>
  );
}
