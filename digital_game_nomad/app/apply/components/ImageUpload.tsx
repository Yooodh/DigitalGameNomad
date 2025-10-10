// slice
import styles from '../styles/Apply.module.scss';
import { ImageUploadProps } from '../types';

// layer
import { Upload, X } from '@/shared/icons';

export default function ImageUpload({
  previewImage,
  isDragging,
  onImageChange,
  onRemoveImage,
  onDrop,
  onDragOver,
  onDragLeave,
}: ImageUploadProps) {
  return (
    <div className={styles.uploadContainer}>
      <label className={styles.fieldContainer__label}>
        <span className={`${styles.icon} ${styles.iconUpload}`}>
          <Upload />
        </span>
        대표 이미지
      </label>

      {previewImage ? (
        <div className={styles.previewContainer}>
          <div className={styles.previewContainer__wrap}>
            <img
              src={previewImage}
              alt='Preview'
              className={styles.previewContainer__image}
            />
            <button
              type='button'
              onClick={onRemoveImage}
              className={styles.deleteBtn}
            >
              <span className={styles.icon}>
                <X />
              </span>
            </button>
            <div className={styles.previewContainer__overlay}></div>
          </div>
        </div>
      ) : (
        <div
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          className={`${styles.uploadZoneContainer} ${
            isDragging ? styles.dragging : ''
          }`}
        >
          <input
            type='file'
            accept='image/*'
            onChange={(e) =>
              e.target.files?.[0] && onImageChange(e.target.files[0])
            }
            className={styles.uploadZoneContainer__input}
          />
          <span className={styles.uploadZoneContainer__icon}>
            <Upload />
          </span>

          <p className={styles.uploadZoneContainer__title}>
            이미지를 드래그하거나 클릭해서 업로드하세요.
          </p>
          <p className={styles.uploadZoneContainer__subtitle}>
            JPG, PNG, GIF 파일을 지원합니다.
          </p>
        </div>
      )}
    </div>
  );
}
