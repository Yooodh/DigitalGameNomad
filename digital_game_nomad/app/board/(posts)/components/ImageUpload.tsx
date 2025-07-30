'use client';

// slice
import styles from '../styles/BoardPost.module.scss';
import { ImageUploadProps } from '../types';

export default function ImageUpload({
  currentImageUrl,
  handleImageChange,
  handleRemoveImage,
}: ImageUploadProps) {
  return (
    <div className={styles.imgContainer}>
      <label htmlFor='imageUpload' className={styles.label}>
        이미지 첨부
      </label>
      <div className={styles.uploadContainer}>
        <label htmlFor='imageUpload'>
          <input
            type='file'
            id='imageUpload'
            accept='image/*'
            onChange={handleImageChange}
            onClick={(e) => {
              (e.target as HTMLInputElement).value = '';
            }}
          />
          <span>클릭하거나 파일을 여기에 드롭하여 이미지를 업로드하세요.</span>
        </label>
      </div>
      {currentImageUrl && (
        <div className={styles.previewContainer}>
          <img
            src={currentImageUrl}
            alt='미리보기'
            className={styles.previewContainer__img}
          />
          <button
            type='button'
            onClick={handleRemoveImage}
            className={styles.previewContainer__removeBtn}
          >
            X
          </button>
        </div>
      )}
    </div>
  );
}
