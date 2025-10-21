// slice
import styles from '../styles/Navbar.module.scss';
import { ThemeButtonProps } from '../types';

export default function ThemeButton({
  theme,
  onToggleTheme,
}: ThemeButtonProps) {
  return (
    <div className={styles.themeContainer} onClick={onToggleTheme}>
      {theme === 'dark' ? (
        <p className={styles.themeContainer__dark}>🌙 DarkMode</p>
      ) : (
        <p className={styles.themeContainer__light}>☀️ LightMode</p>
      )}
    </div>
  );
}
