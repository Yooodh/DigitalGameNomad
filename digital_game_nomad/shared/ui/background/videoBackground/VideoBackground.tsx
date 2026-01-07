// slice
import styles from './VidoeBackground.module.scss';

export default function Video() {
  return (
    <video
      className={styles.video}
      autoPlay
      muted={true}
      loop
      playsInline
      controls={false}
      disablePictureInPicture
      aria-hidden='true'
      webkit-playsinline='true'
      x5-playsinline='true'
      preload='auto'
      poster='/images/network.jpg'
    >
      <source src='/videos/network.mp4' type='video/mp4' />
    </video>
  );
}
