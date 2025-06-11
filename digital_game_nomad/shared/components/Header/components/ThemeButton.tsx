// slice
import styles from '../styles/Header.module.scss';
import { ThemeButtonProps } from '../types';

export default function ThemeButton({
  theme,
  onToggleTheme,
}: ThemeButtonProps) {
  return (
    <div className={styles.headerContainer__theme} onClick={onToggleTheme}>
      {theme === 'dark' ? <p>☀️</p> : <p>🌙</p>}
    </div>
  );
}
