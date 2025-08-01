// slice
import Header from '../../components/Header';
import Pagination from '../../components/Pagination';
import Search from '../../components/Search';
import Empty from '../../components/Empty';
import Table from '../components/Table';
import styles from '../styles/Review.module.scss';
import { ReviewPresenterProps } from '../types';

// layer
import { useScrollToTop } from '@/shared/hooks/useScrollToTop';

export default function ReviewPresenter({
  currentPosts,
  filteredPostsCount,
  startIndex,
  totalPages,
  currentPage,
  filterOption,
  inputValue,
  onPostClick,
  onWriteClick,
  onListClick,
  onFilterChange,
  onInputChange,
  onSearch,
  onPageChange,
  maxVisiblePages,
}: ReviewPresenterProps) {
  useScrollToTop(currentPage, 'smooth');

  return (
    <div className={styles.reviewContainer}>
      <div className={styles.contentContainer}>
        <div className={styles.sectionContainer}>
          <Header
            filteredPostsCount={filteredPostsCount}
            onListClick={onListClick}
            onWriteClick={onWriteClick}
            boardTitle='후기게시판'
          />

          {currentPosts.length > 0 ? (
            <>
              <Table
                currentPosts={currentPosts}
                filteredPostsCount={filteredPostsCount}
                startIndex={startIndex}
                onPostClick={onPostClick}
              />
              <Pagination
                currentPosts={currentPosts}
                filteredPostsCount={filteredPostsCount}
                startIndex={startIndex}
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={onPageChange}
                maxVisiblePages={maxVisiblePages}
              />
            </>
          ) : (
            <Empty />
          )}

          <Search
            filterOption={filterOption}
            inputValue={inputValue}
            onFilterChange={onFilterChange}
            onInputChange={onInputChange}
            onSearch={onSearch}
            searchOptions={['제목', '내용', '닉네임', '게임명', '제목+내용']}
          />
        </div>
      </div>
    </div>
  );
}
