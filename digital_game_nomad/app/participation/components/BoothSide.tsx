// package
import Image from 'next/image';

// slice
import ParticipationServiceText from './ServiceText';
import styles from '../styles/Participation.module.scss';
import { BoothSideProps } from '../types';

// layer
import boothSide from '@/public/images/booth_side.png';

export default function BoothSide({
  boothSideVisible,
  setBoothSideRef,
  textSectionsVisible,
  setTextSectionRef,
}: BoothSideProps) {
  return (
    <div className={styles.serviceContainer__content}>
      <div className={styles.serviceContainer__grid}>
        <div
          className={`${styles.serviceContainer__image} ${
            boothSideVisible.has(1) ? styles['fade-in-left'] : ''
          }`}
          ref={(el) => setBoothSideRef(el, 1)}
          data-id={1}
        >
          <div className={styles.serviceContainer__imgWrap}>
            <Image
              src={boothSide}
              className={styles.serviceContainer__boothSide}
              alt='부스 측면 이미지'
              priority
            />
          </div>
        </div>

        <div className={styles.serviceContainer__text}>
          <ParticipationServiceText
            textSectionsVisible={textSectionsVisible}
            setTextSectionRef={setTextSectionRef}
          />
        </div>
      </div>
    </div>
  );
}
