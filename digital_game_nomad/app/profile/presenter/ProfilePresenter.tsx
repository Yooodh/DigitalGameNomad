// slice
import Header from '../components/Header';
import Tabs from '../components/Tabs';
import InfoTab from '../components/InfoTab';
import ActivityTab from '../components/ActivityTab';
import styles from '../styles/Profile.module.scss';
import { ProfilePresenterProps } from '../types';

export default function ProfilePresenter({
  profile,
  editingProfile,
  editMode,
  activeTab,
  isLoading,
  validation,
  onInputChange,
  onEdit,
  onSave,
  onCancel,
  onSetActiveTab,
  getGradeText,
  formatDate,
  getGradeIcon,
  onCameraClick,
  onRemoveImage,
  profileImage,
  fileInputRef,
  onFileInputChange,
}: ProfilePresenterProps) {
  if (!profile || !editingProfile) {
    return <div>프로필 정보를 불러오는 중...</div>;
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileContainer__wrap}>
        <div className={styles.cardContainer}>
          <Header
            profile={profile}
            editMode={editMode}
            isLoading={isLoading}
            onEdit={onEdit}
            onSave={onSave}
            onCancel={onCancel}
            getGradeText={getGradeText}
            getGradeIcon={getGradeIcon}
            formatDate={formatDate}
            onCameraClick={onCameraClick}
            onRemoveImage={onRemoveImage}
            profileImage={profileImage}
          />

          <Tabs activeTab={activeTab} onSetActiveTab={onSetActiveTab} />

          <div className={styles.tabContainer}>
            {activeTab === 'info' && (
              <InfoTab
                profile={profile}
                editingProfile={editingProfile}
                editMode={editMode}
                validation={validation}
                onInputChange={onInputChange}
              />
            )}

            {activeTab === 'activity' && (
              <ActivityTab
                profile={profile}
                formatDate={formatDate}
                getGradeText={getGradeText}
                getGradeIcon={getGradeIcon}
              />
            )}
          </div>
        </div>
      </div>

      <input
        type='file'
        accept='image/*'
        ref={fileInputRef}
        onChange={onFileInputChange}
        style={{ display: 'none' }}
      />
    </div>
  );
}
