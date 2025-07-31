import { ProcessedStar } from '@/features/starrating/types/StarRating.types';

export type EmptyProps = {
  title: string;
  message: string;
  buttonText?: string;
  onButtonClick?: () => void;
};

export type ImageUploadProps = {
  currentImageUrl: string;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveImage: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export type InputGroupProps = {
  label: string;
  id: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  required?: boolean;

  InputComponent: 'input' | 'textarea' | React.ElementType;

  otherProps?: { [key: string]: any };
};

export type TypeAndGameProps = {
  gameName: string;
  setGameName?: (gameName: string) => void;
  handleGameSelect?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  gameList: string[];
  isReviewMode: boolean;

  currentRating: number;
  displayRequirementText: string;
  isSelectFieldRequired: boolean;

  hoverRating: number;
  processedStars: ProcessedStar[];
  handleStarClick: (index: number) => void;
  handleStarMouseEnter: (index: number) => void;
  handleStarMouseLeave: () => void;

  mode: 'edit' | 'write';
};

export type ValidationRules = {
  title?: {
    required?: boolean;
    maxLength?: number;
  };
  content?: {
    required?: boolean;
    maxLength?: number;
  };
  game?: {
    required?: boolean;
  };
  rating?: {
    min?: number;
    max?: number;
  };
};
