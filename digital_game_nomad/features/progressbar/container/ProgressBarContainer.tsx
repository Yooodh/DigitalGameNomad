'use client';

// slice
import ProgressBarPresenter from '../presenter/ProgressBarPresenter';
import { ProgressBarContainerProps } from '../types/ProgressBar.types';

export default function ProgressBarContainer({
  currentStep,
  totalSteps,
}: ProgressBarContainerProps) {
  return (
    <ProgressBarPresenter currentStep={currentStep} totalSteps={totalSteps} />
  );
}
