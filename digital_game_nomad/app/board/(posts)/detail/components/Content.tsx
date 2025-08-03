'use client';

// slice
import styles from '../styles/Detail.module.scss';
import { ContentProps } from '../types';

// layer
import LoadingSpinner from '@/shared/components/Spinner';

export default function Content({
  postText,
  imageUrl,
  imageLoading,
  imageError,
  handleImageLoad,
  handleImageError,
}: ContentProps) {
  return (
    <div className={styles.contentContainer}>
      {imageUrl && (
        <div className={styles.imgContainer}>
          {imageLoading && <LoadingSpinner message='이미지를 불러오는 중...' />}
          {!imageError ? (
            <img
              src={imageUrl}
              alt='게시글 이미지'
              className={styles.imgContainer__img}
              onLoad={handleImageLoad}
              onError={handleImageError}
              style={{
                display: imageLoading ? 'none' : 'block',
              }}
            />
          ) : (
            <div className={styles.imgContainer__error}>
              <span>이미지를 불러올 수 없습니다.</span>
            </div>
          )}
        </div>
      )}

      <div className={styles.contentContainer__text}>
        {postText.split('\n').map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
    </div>
  );
}
