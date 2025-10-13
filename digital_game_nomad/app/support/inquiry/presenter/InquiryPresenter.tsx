// slice
import styles from '../styles/Inquiry.module.scss';
import FormInput from '../components/FormInput';
import FormTextarea from '../components/FormTextarea';
import SubmitButton from '../components/SubmitButton';
import Header from '../components/Header';
import { InquiryPresenterProps } from '../types';

export default function InquiryPresenter({
  formData,
  errors,
  isSubmitting,
  handleInputChange,
  submitQuestion,
}: InquiryPresenterProps) {
  return (
    <div className={styles.inquiryContainer}>
      <Header
        title='문의하기'
        subTitle='궁금한 점이 있으시면 언제든 문의해 주세요.'
      />

      <div className={styles.cardContainer}>
        <form
          className={styles.formContainer}
          onSubmit={(e) => e.preventDefault()}
        >
          <FormInput
            id='title'
            label='제목'
            placeholder='제목을 입력해주세요.'
            value={formData.title}
            onChange={(value) => handleInputChange('title', value)}
            error={errors.title}
            disabled={isSubmitting}
            required
          />

          <FormTextarea
            id='content'
            label='내용'
            placeholder='문의 내용을 입력해주세요.'
            value={formData.text}
            onChange={(value) => handleInputChange('text', value)}
            error={errors.text}
            disabled={isSubmitting}
            required
            rows={8}
          />

          <SubmitButton
            isSubmitting={isSubmitting}
            onClick={submitQuestion}
            label='문의 등록'
            submittingLabel='등록 중'
          />
        </form>
      </div>
    </div>
  );
}
