// package
import { RefObject } from 'react';

// slice
import styles from '../styles/Select.module.scss';
import SelectHeader from '../components/SelectHeader';
import CharacterList from '../components/CharacterList';
import { SelectPresenterProps } from '../types';

// layer
import ConditionalButton from '@/shared/components/ConditionalButton';

export default function SelectPresenter({
  characters,
  selectedCharacter,
  onCharacterSelect,
  onEnterExhibition,
  listRef,
  enterButtonRef,
}: SelectPresenterProps & {
  enterButtonRef: RefObject<HTMLButtonElement | null>;
}) {
  return (
    <div className={styles.selectContainer}>
      <div className={styles.selectContainer__content}>
        <SelectHeader />
        <CharacterList
          listRef={listRef}
          characters={characters}
          selectedCharacter={selectedCharacter}
          onCharacterSelect={onCharacterSelect}
        />
        <div className={styles.selectContainer__loadingInfo}>
          <p>※ 보다 나은 서비스를 위해 향후 업데이트를 준비 중입니다.</p>
        </div>
        <ConditionalButton
          buttonRef={enterButtonRef}
          onClick={onEnterExhibition}
          disabled={!selectedCharacter}
          className={selectedCharacter ? styles.buttonActive : ''}
        >
          {selectedCharacter ? '전시관 입장하기' : '캐릭터를 선택해 주세요'}
        </ConditionalButton>
      </div>
    </div>
  );
}
