'use client';

// slice
import InquiryPresenter from '../presenter/InquiryPresenter';
import { useInquirySubmission } from '../hooks/useInquirySubmission';

export default function InquiryContainer() {
  const { formData, errors, isSubmitting, handleInputChange, submitQuestion } =
    useInquirySubmission();

  return (
    <InquiryPresenter
      formData={formData}
      errors={errors}
      isSubmitting={isSubmitting}
      handleInputChange={handleInputChange}
      submitQuestion={submitQuestion}
    />
  );
}
