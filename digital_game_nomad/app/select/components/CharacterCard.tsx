'use client';

// slice
import styles from '../styles/Select.module.scss';
import { CharacterCardProps } from '../types';

export default function CharacterCard({
  character,
  isSelected,
  onClick,
}: CharacterCardProps) {
  return (
    <div
      className={`${styles.characterCard} ${
        isSelected ? styles.cardSelected : ''
      }`}
      style={{
        borderColor: isSelected ? character.color : 'transparent',
        boxShadow: isSelected
          ? `0 0 24px 4px ${character.color}88`
          : '0 8px 24px rgba(20, 20, 30, 0.3)',
      }}
      onClick={onClick}
    >
      <div className={styles.characterCard__imageWrap}>
        <img
          src={character.image}
          alt={character.name}
          className={styles.characterCard__image}
        />
      </div>
      <div className={styles.characterCard__badge}>{character.name}</div>
      <div className={styles.characterCard__info}>
        <p className={styles.characterCard__description}>
          {character.description}
        </p>
      </div>
    </div>
  );
}
