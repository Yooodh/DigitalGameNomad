// slice
import styles from '../styles/Profile.module.scss';
import { ProfileImageProps } from '../types';

// layer
import { Camera, User, Trash2 } from '@/shared/icons';

export default function ProfileImage({
  profileImage,
  editMode,
  onCameraClick,
  onRemoveImage,
}: ProfileImageProps) {
  return (
    <div className={styles.imgContainer}>
      <div className={styles.imgContainer__img}>
        {profileImage ? (
          <img src={profileImage} alt='Profile' />
        ) : (
          <span className={styles.defaultAvatar}>
            <User />
          </span>
        )}
      </div>

      {editMode && (
        <button
          className={styles.imgContainer__btn}
          onClick={onCameraClick}
          aria-label='프로필 이미지 변경'
        >
          <Camera />
        </button>
      )}

      {editMode && profileImage && (
        <button
          type='button'
          className={styles.imgContainer__removeBtn}
          onClick={onRemoveImage}
        >
          <Trash2 />
        </button>
      )}
    </div>
  );
}
