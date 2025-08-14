// slice
import styles from '../styles/Navbar.module.scss';
import { ThemeButtonProps } from '../types';

export default function ThemeButton({
  theme,
  onToggleTheme,
}: ThemeButtonProps) {
  return (
    <div className={styles.navbarContainer__theme} onClick={onToggleTheme}>
      {theme === 'dark' ? <p>☀️</p> : <p>🌙</p>}
    </div>
  );
}
