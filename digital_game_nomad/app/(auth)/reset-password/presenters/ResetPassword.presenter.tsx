// slice
import ProgressBar from '../components/ProgressBar';
import FirstStepCurrentPassword from '../components/FirstStepCurrentPassword';
import SecondStepNewPassword from '../components/SecondStepNewPassword';
import ThridStepCompletion from '../components/ThridStepCompletion';
import styles from '../styles/ResetPassword.module.scss';
import { ResetPasswordPresenterProps } from '../types';

export default function ResetPasswordPresenter(
  props: ResetPasswordPresenterProps
) {
  const { step, handleSubmit } = props;

  return (
    <div className={styles.resetPasswordContainer}>
      <div className={styles.cardContainer}>
        <div className={styles.headerContainer}>
          <h1 className={styles.headerContainer__title}>비밀번호 변경</h1>
          <ProgressBar step={step} />
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          {step === 1 && (
            <FirstStepCurrentPassword
              {...props}
              togglePasswordVisibility={() =>
                props.togglePasswordVisibility('current')
              }
            />
          )}
          {step === 2 && (
            <SecondStepNewPassword
              {...props}
              handlePrev={() => props.setStep(1)}
            />
          )}
          {step === 3 && <ThridStepCompletion />}
        </form>
      </div>
    </div>
  );
}
