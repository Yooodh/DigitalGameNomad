// slice
import ProfileImage from './ProfileImage';
import ProfileInfo from './ProfileInfo';
import Action from './Action';
import styles from '../styles/Profile.module.scss';
import { HeaderProps } from '../types';

export default function Header({
  profile,
  editMode,
  isLoading,
  onEdit,
  onSave,
  onCancel,
  getGradeText,
  getGradeIcon,
  formatDate,
  onCameraClick,
  onRemoveImage,
  profileImage,
}: HeaderProps) {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerContainer__cover}></div>

      <div className={styles.headerContainer__imgWrap}>
        <ProfileImage
          profileImage={profileImage}
          editMode={editMode}
          onCameraClick={onCameraClick}
          onRemoveImage={onRemoveImage}
        />

        <ProfileInfo
          profile={profile}
          getGradeText={getGradeText}
          getGradeIcon={getGradeIcon}
          formatDate={formatDate}
        />

        <Action
          editMode={editMode}
          isLoading={isLoading}
          onEdit={onEdit}
          onSave={onSave}
          onCancel={onCancel}
        />
      </div>
    </div>
  );
}
