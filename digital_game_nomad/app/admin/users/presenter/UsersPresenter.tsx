// slice
import StatsCards from '../components/StatsCards';
import FiltersAndSort from '../components/FiltersAndSort';
import Table from '../components/Table';
import styles from '../styles/Users.module.scss';
import { Props } from '../types';

export default function UsersPresenter(props: Props) {
  return (
    <div className={styles.userContainer}>
      <StatsCards {...props} />
      <FiltersAndSort {...props} />
      <Table {...props} />
    </div>
  );
}
