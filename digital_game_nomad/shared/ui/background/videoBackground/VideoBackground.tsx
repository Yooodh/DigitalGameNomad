// slice
import styles from './VidoeBackground.module.scss';

export default function Video() {
  return (
    <video className={styles.video} autoPlay muted loop>
      <source src='/videos/network.mp4' type='video/mp4' />
    </video>
  );
}
