// package
import { useState } from 'react';

// slice
import styles from '../styles/AdminApplications.module.scss';
import { AdminApplicationImageProps } from '../types';

// layer
import { Image } from '@/shared/icons';

export default function AdminApplicationImage({
  hasImage,
  imageData,
}: AdminApplicationImageProps) {
  const [hasError, setHasError] = useState<boolean>(false);

  if (!hasImage || !imageData) {
    return null;
  }

  return (
    <div className={styles.imgContainer}>
      <div className={styles.imgContainer__header}>
        <Image />
        <span className={styles.imgContainer__label}>첨부 이미지</span>
      </div>
      <div className={styles.imgContainer__content}>
        {hasError ? (
          <div className={styles.imgContainer__placeholder}>
            <div className={styles.imgContainer__placeholderIcon}>
              <Image />
            </div>
            <p className={styles.imgContainer__placeholderText}>
              이미지를 불러올 수 없습니다
            </p>
          </div>
        ) : (
          <img
            src={imageData}
            alt='신청서 첨부 이미지'
            className={styles.imgContainer__image}
            onError={() => setHasError(true)}
          />
        )}
      </div>
    </div>
  );
}
