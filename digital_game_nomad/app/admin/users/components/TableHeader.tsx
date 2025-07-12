// slice
import styles from '../styles/Users.module.scss';
import { TableHeaderProps } from '../types';

export default function TableHeader({
  isAllSelectedOnPage,
  handleSelectAll,
}: TableHeaderProps) {
  return (
    <thead className={styles.headerContainer}>
      <tr>
        <th className={styles.headerContainer__checkbox}>
          <input
            type='checkbox'
            checked={isAllSelectedOnPage}
            onChange={(e) => handleSelectAll(e.target.checked)}
            className={styles.checkboxContainer__checkbox}
          />
        </th>
        <th className={styles.headerContainer__name}>이름</th>
        <th className={styles.headerContainer__nickname}>닉네임</th>
        <th className={styles.headerContainer__email}>이메일</th>
        <th className={styles.headerContainer__phone}>전화번호</th>
        <th className={styles.headerContainer__level}>등급</th>
        <th className={styles.headerContainer__joinDate}>가입일</th>
        <th className={styles.headerContainer__lastLoginDate}>최근 접속일</th>
        <th className={styles.headerContainer__deleteDate}>삭제일</th>
        <th className={styles.headerContainer__action}>작업</th>
      </tr>
    </thead>
  );
}
