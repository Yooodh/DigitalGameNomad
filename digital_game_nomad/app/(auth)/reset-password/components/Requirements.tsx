// slice
import styles from '../styles/ResetPassword.module.scss';
import { RequirementsProps } from '../types';

export default function Requirements({ password }: RequirementsProps) {
  return (
    <div className={styles.passwordRequirements}>
      <p className={styles.passwordRequirements__title}>비밀번호 요구사항:</p>
      <ul className={styles.passwordRequirements__list}>
        <li className={password.length >= 8 ? styles.valid : ''}>
          최소 8자 이상
        </li>
        <li className={/[a-z]/.test(password) ? styles.valid : ''}>
          영문 소문자 포함
        </li>
        <li className={/[A-Z]/.test(password) ? styles.valid : ''}>
          영문 대문자 포함 (선택)
        </li>
        <li className={/\d/.test(password) ? styles.valid : ''}>숫자 포함</li>
        <li className={/[@$!%*?&]/.test(password) ? styles.valid : ''}>
          특수문자 포함
        </li>
      </ul>
    </div>
  );
}
