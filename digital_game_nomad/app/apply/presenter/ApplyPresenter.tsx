// slice
import ImageUpload from '../components/ImageUpload';
import InputField from '../components/InputField';
import UrlInput from '../components/UrlInput';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SubmitButton from '../components/SubmitButton';
import styles from '../styles/Apply.module.scss';
import { ApplyPresenterProps } from '../types';

// layer
import { Building, Upload, Image } from '@/shared/icons';

export default function ApplyPresenter({
  formData,
  previewImage,
  isDragging,
  onInputChange,
  onImageChange,
  onRemoveImage,
  onDrop,
  onDragOver,
  onDragLeave,
  onSubmit,
}: ApplyPresenterProps) {
  return (
    <div className={styles.applyContainer}>
      <div className={styles.applyContainer__wrap}>
        <Header />

        <div className={styles.formContainer}>
          <div className={styles.formContainer__content}>
            <InputField
              label='기업 이름'
              icon={<Building />}
              iconClassName={styles.iconCompany}
              value={formData.companyName}
              onChange={(value) => onInputChange('companyName', value)}
              placeholder='기업 이름을 입력해주세요'
              inputClassName={styles.inputCompany}
            />

            <InputField
              label='게임 이름'
              icon={<Upload />}
              iconClassName={styles.iconGame}
              value={formData.gameName}
              onChange={(value) => onInputChange('gameName', value)}
              placeholder='게임 이름을 입력해주세요'
              inputClassName={styles.inputGame}
            />

            <InputField
              label='전시 내용'
              icon={<Image />}
              iconClassName={styles.iconDescription}
              type='textarea'
              value={formData.description}
              onChange={(value) => onInputChange('description', value)}
              placeholder='전시 내용을 자세히 설명해주세요'
              rows={4}
              inputClassName={styles.inputDescription}
            />

            <UrlInput
              formData={{
                gameUrl: formData.gameUrl,
                youtubeUrl: formData.youtubeUrl,
              }}
              onInputChange={(field, value) => onInputChange(field, value)}
            />

            <ImageUpload
              previewImage={previewImage}
              isDragging={isDragging}
              onImageChange={onImageChange}
              onRemoveImage={onRemoveImage}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
            />

            <SubmitButton onSubmit={onSubmit} />
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
