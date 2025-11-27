// slice
import ProfileField from './ProfileField';
import StaticProfileField from './StaticProfileField';
import styles from '../styles/Profile.module.scss';
import { InfoTabProps } from '../types';

// layer
import { User, Edit3, Mail, Phone } from '@/shared/icons';

export default function InfoTab({
  profile,
  editingProfile,
  editMode,
  validation,
  onInputChange,
}: InfoTabProps) {
  return (
    <div className={styles.contectContainer}>
      <ProfileField
        label='이름'
        icon={<User />}
        value={profile.name}
        editingValue={editingProfile.name}
        editMode={editMode}
        validationError={!validation.name && !!editingProfile.name}
        errorMessage='한글이나 영문으로 입력해 주세요.'
        onInputChange={(value) => onInputChange('name', value)}
        maxLength={10}
        placeholder='이름을 입력해주세요.'
      />

      <ProfileField
        label='닉네임'
        icon={<Edit3 />}
        value={`@${profile.nickname}`}
        editingValue={editingProfile.nickname}
        editMode={editMode}
        validationError={!validation.nickname && !!editingProfile.nickname}
        errorMessage='한글, 영문, 숫자만 입력 가능하며 10자 이내로 입력해 주세요.'
        onInputChange={(value) => onInputChange('nickname', value)}
        maxLength={10}
        placeholder='닉네임을 입력해주세요.'
      />

      <StaticProfileField
        label='이메일'
        icon={<Mail />}
        value={profile.email}
        badgeText='인증완료'
      />

      <StaticProfileField
        label='전화번호'
        icon={<Phone />}
        value={
          profile.phone[0]
            ? `[${profile.phone[0]}] ${profile.phone.slice(1).join('-')}`
            : profile.phone.slice(1).join('-')
        }
      />

      {editMode && !validation.phone && (
        <p className={styles.fieldContainer__errorMessage}>
          올바른 전화번호를 입력해주세요.
        </p>
      )}
    </div>
  );
}
