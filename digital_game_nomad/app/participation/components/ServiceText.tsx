// package
import React from 'react';

// slice
import styles from '../styles/Participation.module.scss';
import { ParticipationServiceTextProps } from '../types';

export default function ParticipationServiceText({
  textSectionsVisible,
  setTextSectionRef,
}: ParticipationServiceTextProps) {
  return (
    <div className={styles.textContainer}>
      <div className={styles.textContainer__block}>
        <h3
          className={`${styles.textContainer__brandName} ${
            textSectionsVisible.has(1) ? styles['bounce-top'] : ''
          }`}
          ref={(el) => setTextSectionRef(el, 1)}
          data-id={1}
        >
          Digital Game Nomad
        </h3>
        <p
          className={`${styles.textContainer__desc} ${
            textSectionsVisible.has(2) ? styles['slide-right'] : ''
          }`}
          ref={(el) => setTextSectionRef(el, 2)}
          data-id={2}
        >
          는 온라인 웹 플랫폼으로
        </p>
      </div>

      <div className={styles.textContainer__block}>
        <p
          className={`${styles.textContainer__desc} ${
            textSectionsVisible.has(3) ? styles['slide-left'] : ''
          }`}
          ref={(el) => setTextSectionRef(el, 3)}
          data-id={3}
        >
          사용자에게
        </p>
        <div
          className={`${styles.textContainer__highlight} ${
            styles.highlightYellow
          } ${textSectionsVisible.has(4) ? styles['bounce-top'] : ''}`}
          ref={(el) => setTextSectionRef(el, 4)}
          data-id={4}
        >
          3D 맵
        </div>
        <p
          className={`${styles.textContainer__desc} ${
            textSectionsVisible.has(5) ? styles['slide-right'] : ''
          }`}
          ref={(el) => setTextSectionRef(el, 5)}
          data-id={5}
        >
          에서
        </p>
      </div>

      <div className={styles.textContainer__block}>
        <p
          className={`${styles.textContainer__desc} ${
            textSectionsVisible.has(6) ? styles['slide-left'] : ''
          }`}
          ref={(el) => setTextSectionRef(el, 6)}
          data-id={6}
        >
          직접 상호작용을 함으로써
        </p>
        <div
          className={`${styles.textContainer__highlight} ${
            styles.highlightBlue
          } ${textSectionsVisible.has(7) ? styles['bounce-top'] : ''}`}
          ref={(el) => setTextSectionRef(el, 7)}
          data-id={7}
        >
          현장감
        </div>
        <p
          className={`${styles.textContainer__desc} ${
            textSectionsVisible.has(8) ? styles['slide-right'] : ''
          }`}
          ref={(el) => setTextSectionRef(el, 8)}
          data-id={8}
        >
          과 사용자 이용경험을 동시에 제공합니다.
        </p>
      </div>

      <div className={styles.featuresContainer}>
        <div className={styles.featuresContainer__feature}>
          <div className={styles.featuresContainer__icon}>🎮</div>
          <h4>몰입형 3D 경험</h4>
          <p>가상현실과 같은 실감나는 게임 체험</p>
        </div>
        <div className={styles.featuresContainer__feature}>
          <div className={styles.featuresContainer__icon}>🌐</div>
          <h4>온라인 접근성</h4>
          <p>언제 어디서나 접속 가능한 웹 플랫폼</p>
        </div>
        <div className={styles.featuresContainer__feature}>
          <div className={styles.featuresContainer__icon}>🤝</div>
          <h4>인터랙티브 체험</h4>
          <p>직접 참여하고 소통하는 체험형 전시</p>
        </div>
        <div className={styles.featuresContainer__feature}>
          <div className={styles.featuresContainer__icon}>🛡️</div>
          <h4>안전한 문화 공간</h4>
          <p>외부 위험 없이 자유롭게 즐기는 문화 활동</p>
        </div>
      </div>
    </div>
  );
}
