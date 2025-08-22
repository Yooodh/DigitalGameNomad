// slice
import ProgressBar from '../components/ProgressBar';
import FirstStepEmailVerification from '../components/FirstStepEmailVerification';
import SecondStepPersonalInfo from '../components/SecondStepPersonalInfo';
import ThirdStepNewPhoneInput from '../components/ThirdStepNewPhoneInput';
import FourthStepCompletion from '../components/FourthStepCompletion';
import styles from '../styles/ResetPhone.module.scss';
import { ResetPhonePresenterProps } from '../types';

export default function ResetPhonePresenter(props: ResetPhonePresenterProps) {
  const { step, handleSubmit, handlePrevStep, handleCompletionAndRedirect } =
    props;

  return (
    <div className={styles.resetPhoneContainer}>
      <div className={styles.cardContainer}>
        <div className={styles.headerContainer}>
          <h1 className={styles.headerContainer__title}>전화번호 변경</h1>

          <ProgressBar currentStep={step} totalSteps={4} />
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {step === 1 && <FirstStepEmailVerification {...props} />}
          {step === 2 && (
            <SecondStepPersonalInfo
              {...props}
              handlePrevStep={handlePrevStep}
              personalInfoError={props.personalInfoError}
            />
          )}
          {step === 3 && (
            <ThirdStepNewPhoneInput
              {...props}
              handlePrevStep={handlePrevStep}
              handleSelectBlur={props.handleSelectBlur}
            />
          )}
          {step === 4 && (
            <FourthStepCompletion
              {...props}
              handleCompletionAndRedirect={handleCompletionAndRedirect}
            />
          )}
        </form>
      </div>
    </div>
  );
}
