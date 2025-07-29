// slice
import Header from '../../components/Header';
import Table from '../components/Table';
import Pagination from '../../components/Pagination';
import Search from '../../components/Search';
import Empty from '../../components/Empty';
import styles from '../styles/Free.module.scss';
import { FreePresenterProps } from '../types';

// layer
import { useScrollToTop } from '@/shared/hooks/useScrollToTop';

export default function FreePresenter({
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
}: FreePresenterProps) {
  useScrollToTop(currentPage, 'smooth');

  return (
    <div className={styles.freeContainer}>
      <div className={styles.contentContainer}>
        <div className={styles.sectionContainer}>
          <Header
            filteredPostsCount={filteredPostsCount}
            onListClick={onListClick}
            onWriteClick={onWriteClick}
            boardTitle='자유게시판'
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
            searchOptions={['제목', '내용', '닉네임', '제목+내용']}
          />
        </div>
      </div>
    </div>
  );
}
