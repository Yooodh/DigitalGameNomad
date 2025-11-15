// slice
import ApplicationCard from '../components/ApplicationCard';
import ApplicationSearchInput from '../components/ApplicationSearchInput';
import EmptyApplicationsMessage from '../components/EmptyApplicationsMessage';
import styles from '../styles/UserApplications.module.scss';
import { UserApplicationsPresenterProps } from '../types';

export default function UserApplicationsPresenter({
  searchTerm,
  filteredApplications,
  onSearchChange,
}: UserApplicationsPresenterProps) {
  return (
    <div className={styles.applicationsContainer}>
      <div className={styles.applicationsContainer__wrap}>
        <div className={styles.headerContainer}>
          <h1 className={styles.headerContainer__title}>신청내역</h1>
          <p className={styles.headerContainer__subtitle}>
            제출하신 게임 전시회 신청서들의 상태를 확인하세요.
          </p>
        </div>

        <div className={styles.filtersContainer}>
          <ApplicationSearchInput
            searchTerm={searchTerm}
            onSearchChange={onSearchChange}
          />
        </div>

        {filteredApplications.length === 0 ? (
          <EmptyApplicationsMessage />
        ) : (
          <div className={styles.gridContainer}>
            {filteredApplications.map((application) => (
              <ApplicationCard key={application.id} application={application} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
