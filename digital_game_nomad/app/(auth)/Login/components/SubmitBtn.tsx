// slice
import styles from '../styles/Login.module.scss';
import { LoginSubmitButtonProps } from '../types';

export default function SubmitBtn({ isLoading }: LoginSubmitButtonProps) {
  return (
    <button type='submit' disabled={isLoading} className={styles.btnContainer}>
      {isLoading ? (
        <div className={styles.btnContainer__loader}></div>
      ) : (
        <>로그인</>
      )}
    </button>
  );
}
