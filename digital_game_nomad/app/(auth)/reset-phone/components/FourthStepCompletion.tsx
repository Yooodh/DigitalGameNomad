// slice
import InfoDisplay from './InfoDisplay';
import styles from '../styles/ResetPhone.module.scss';
import { FourthStepCompletionProps } from '../types';

// layer
import { Check } from '@/shared/icons';

export default function FourthStepCompletion({
  formData,
  handleCompletionAndRedirect,
}: FourthStepCompletionProps) {
  return (
    <div className={styles.stepContainer}>
      <div className={styles.stepContainer__completionIcon}>
        <svg viewBox='0 0 24 23' className={styles.successIcon}>
          <Check />
        </svg>
      </div>

      <h2 className={styles.stepContainer__title}>전화번호 변경 완료</h2>
      <p className={styles.stepContainer__desc}>
        전화번호가 성공적으로 변경되었습니다.
      </p>

      <InfoDisplay
        items={[
          { label: '이름', value: formData.name },
          {
            label: '기존 번호',
            value: `[${formData.currentCarrier}] ${formData.currentPhone}`,
          },
          {
            label: '새 번호',
            value: `[${formData.newCarrier}] ${formData.newPhone}`,
          },
        ]}
      />

      <button
        type='button'
        onClick={handleCompletionAndRedirect}
        className={`${styles.btn} ${styles.primary}`}
      >
        확인
      </button>
    </div>
  );
}
