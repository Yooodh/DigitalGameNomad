// slice
import BoothSide from '../components/BoothSide';
import BoothTop from '../components/BoothTop';
import CtaCard from '../components/CtaCard';
import styles from '../styles/Participation.module.scss';
import { ParticipationPresenterProps } from '../types';

export default function ParticipationPresenter({
  navVisible,
  setNavRef,
  boothSideVisible,
  setBoothSideRef,
  textSectionsVisible,
  setTextSectionRef,
  boothTopNavVisible,
  setBoothTopNavRef,
  boothTopVisible,
  setBoothTopRef,
  buttonNavVisible,
  setButtonNavRef,
}: ParticipationPresenterProps) {
  return (
    <div className={styles.participationContainer}>
      <div className={styles.heroContainer}>
        <div
          className={`${styles.heroContainer__content} ${
            navVisible.has(1) ? styles['fade-in-top'] : ''
          }`}
          ref={(el) => setNavRef(el, 1)}
          data-id={1}
        >
          <div className={styles.heroContainer__badge}>Partnership</div>
          <h1 className={styles.heroContainer__title}>기업참여신청</h1>
          <p className={styles.heroContainer__subtitle}>
            디지털 게임 노마드와 함께 새로운 게임 생태계를 만들어보세요.
          </p>
        </div>
      </div>

      <div className={styles.serviceContainer}>
        <BoothSide
          boothSideVisible={boothSideVisible}
          setBoothSideRef={setBoothSideRef}
          textSectionsVisible={textSectionsVisible}
          setTextSectionRef={setTextSectionRef}
        />
      </div>

      <div className={styles.boothContainer}>
        <div
          className={`${styles.boothContainer__header} ${
            boothTopNavVisible.has(1) ? styles['fade-in-top'] : ''
          }`}
          ref={(el) => setBoothTopNavRef(el, 1)}
          data-id={1}
        >
          <h2 className={styles.boothContainer__title}>부스 배치도</h2>
          <p className={styles.boothContainer__subtitle}>
            가상 전시관에서의 부스 배치 현황을 확인하세요.
          </p>
        </div>

        <BoothTop
          boothTopVisible={boothTopVisible}
          setBoothTopRef={setBoothTopRef}
        />
      </div>

      <div className={styles.ctaConatiner}>
        <CtaCard
          buttonNavVisible={buttonNavVisible}
          setButtonNavRef={setButtonNavRef}
        />
      </div>
    </div>
  );
}
