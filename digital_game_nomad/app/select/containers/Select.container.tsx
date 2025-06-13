'use client';

// package
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

// slice
import SelectPresenter from '../presenters/Select.presenter';
import { characters } from '../data';
import { Character } from '../types';

// layer
import { useOnClickOutside } from '@/shared/hooks/useOnClickOutside';

export default function SelectContainer() {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );
  const listRef = useRef<HTMLDivElement>(null);
  const enterButtonRef = useRef<HTMLButtonElement>(null);

  const router = useRouter();

  useOnClickOutside(
    listRef,
    () => {
      setSelectedCharacter(null);
    },
    {
      excludeRefs: [enterButtonRef],
    }
  );

  const handleCharacterSelect = (character: Character) => {
    setSelectedCharacter(character);
  };

  const handleEnterExhibition = () => {
    if (selectedCharacter) {
      alert(`${selectedCharacter.name} 캐릭터로 전시관에 입장합니다!`);
      router.push(`/exhibition?character=${selectedCharacter.id}`);
    }
  };

  return (
    <SelectPresenter
      characters={characters}
      selectedCharacter={selectedCharacter}
      onCharacterSelect={handleCharacterSelect}
      onEnterExhibition={handleEnterExhibition}
      listRef={listRef}
      enterButtonRef={enterButtonRef}
    />
  );
}
