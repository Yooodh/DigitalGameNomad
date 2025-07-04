// slice
import FirstStepEmailVerification from '../components/FirstStepEmailVerification';
import SecondStepNewPassword from '../components/SecondStepNewPassword';
import ThridStepCompletion from '../components/ThridStepCompletion';
import styles from '../styles/ForgotPassword.module.scss';
import { ForgotPasswordPresenterProps } from '../types';

// layer
import { ProgressBar } from '@/features/progressbar';

export default function ForgotPasswordPresenter(
  props: ForgotPasswordPresenterProps
) {
  const { step, handleSubmit, handlePrev } = props;

  return (
    <div className={styles.resetPasswordContainer}>
      <div className={styles.cardContainer}>
        <div className={styles.headerContainer}>
          <h1 className={styles.headerContainer__title}>비밀번호 찾기</h1>

          <ProgressBar currentStep={step} totalSteps={3} />
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          {step === 1 && <FirstStepEmailVerification {...props} />}
          {step === 2 && (
            <SecondStepNewPassword {...props} handlePrev={handlePrev} />
          )}
          {step === 3 && <ThridStepCompletion />}
        </form>
      </div>
    </div>
  );
}
