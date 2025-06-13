// package
import { RefObject } from 'react';

// slice
import CharacterCard from './CharacterCard';
import styles from '../styles/Select.module.scss';
import { CharacterListProps } from '../types';

export default function CharacterList({
  characters,
  selectedCharacter,
  onCharacterSelect,
  listRef,
}: CharacterListProps & { listRef: RefObject<HTMLDivElement | null> }) {
  return (
    <div ref={listRef} className={styles.selectContainer__characters}>
      {characters.map((character) => (
        <CharacterCard
          key={character.id}
          character={character}
          isSelected={selectedCharacter?.id === character.id}
          onClick={() => onCharacterSelect(character)}
        />
      ))}
    </div>
  );
}
