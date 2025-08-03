// package
import { useCallback } from 'react';

// slice
import { ValidationRules } from '../types';

export function useFormValidation() {
  const validate = useCallback(
    (
      data: {
        title?: string;
        content?: string;
        selectedGame?: string;
        rating?: number;
        isReviewMode?: boolean;
      },
      rules: ValidationRules = {}
    ) => {
      const {
        title = { required: true, maxLength: 50 },
        content = { required: true },
        game = { required: false },
        rating = { min: 1, max: 5 },
      } = rules;

      if (title.required && (!data.title || !data.title.trim())) {
        return '제목을 작성하세요.';
      }
      if (
        title.maxLength &&
        data.title &&
        data.title.length > title.maxLength
      ) {
        return `제목은 ${title.maxLength}자를 넘을 수 없습니다.`;
      }

      if (content.required && (!data.content || !data.content.trim())) {
        return '내용을 작성하세요.';
      }

      if (data.isReviewMode) {
        if (game.required !== false && !data.selectedGame) {
          return '게임을 선택하세요.';
        }
        if (data.rating && data.rating < rating.min!) {
          return `${rating.min}점 이상의 별점을 선택해야 합니다.`;
        }
      }

      return null;
    },
    []
  );

  return { validate };
}
