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
        <p className={styles.themeContainer__dark}>🌙 다크 모드</p>
      ) : (
        <p className={styles.themeContainer__light}>☀️ 라이트 모드</p>
      )}
    </div>
  );
}
