import { RefObject } from 'react';

export type Character = {
  id: string;
  name: string;
  description: string;
  image: string;
  color: string;
};

export type CharacterCardProps = {
  character: Character;
  isSelected: boolean;
  onClick: () => void;
};

export type CharacterListProps = {
  characters: Character[];
  selectedCharacter: Character | null;
  onCharacterSelect: (character: Character) => void;
  listRef: RefObject<HTMLDivElement | null>;
};

export type SelectPresenterProps = {
  characters: Character[];
  selectedCharacter: Character | null;
  onCharacterSelect: (character: Character) => void;
  onEnterExhibition: () => void;
  listRef: RefObject<HTMLDivElement | null>;
  enterButtonRef: RefObject<HTMLButtonElement | null>;
};
