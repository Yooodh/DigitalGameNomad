// slice
import InputField from './InputField';
import styles from '../styles/Apply.module.scss';
import { UrlInputProps } from '../types';

// layer
import { Building, Youtube } from '@/shared/icons';

export default function UrlInput({ formData, onInputChange }: UrlInputProps) {
  return (
    <div className={styles.urlContainer}>
      <InputField
        label='게임 URL'
        icon={<Building />}
        iconClassName={styles.iconUrl}
        type='url'
        value={formData.gameUrl}
        onChange={(value) => onInputChange('gameUrl', value)}
        placeholder='https://example.com'
        inputClassName={styles.inputUrl}
      />

      <InputField
        label='유튜브 URL'
        icon={<Youtube />}
        iconClassName={styles.iconYoutube}
        type='url'
        value={formData.youtubeUrl}
        onChange={(value) => onInputChange('youtubeUrl', value)}
        placeholder='https://youtube.com/...'
        inputClassName={styles.inputYoutube}
        isRequired={false}
      />
    </div>
  );
}
