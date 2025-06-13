// slice
import styles from '../styles/Select.module.scss';

export default function SelectHeader() {
  return (
    <div className={styles.selectContainer__header}>
      <h1 className={styles.selectContainer__title}>캐릭터 선택</h1>
      <p className={styles.selectContainer__subtitle}>
        전시관 관람을 위한 캐릭터를 선택해 주세요
      </p>
      <p className={styles.selectContainer__description}>
        컴퓨터 사양에 따라 30초~1분 정도의 로딩시간이 소요됩니다.
      </p>
    </div>
  );
}
