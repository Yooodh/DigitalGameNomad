// package
import { useState } from 'react';

// slice
import styles from '../styles/UserApplications.module.scss';
import { ApplicationImageProps } from '../types';

// layer
import { Image } from '@/shared/icons';

export default function ApplicationImage({
  hasImage,
  imageData,
  gameName,
}: ApplicationImageProps) {
  const [hasError, setHasError] = useState<boolean>(false);

  if (!hasImage || !imageData) {
    return null;
  }

  return (
    <div className={styles.imgContainer}>
      <div className={styles.imgContainer__header}>
        <Image />
        <span className={styles.imgContainer__label}>첨부된 이미지</span>
      </div>
      <div className={styles.imgContainer__content}>
        {hasError ? (
          <div className={styles.imgContainer__placeholder}>
            <div className={styles.imgContainer__placeholderIcon}>
              <Image />
            </div>
            <p className={styles.userImageContainer__placeholderText}>
              이미지를 불러올 수 없습니다
            </p>
          </div>
        ) : (
          <img
            src={imageData}
            alt={`${gameName} 게임 이미지`}
            className={styles.imgContainer__image}
            onError={() => setHasError(true)}
          />
        )}
      </div>
    </div>
  );
}
