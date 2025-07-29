'use client';

// package
import { useCallback } from 'react';

// slice
import FreePresenter from '../presenters/Free.presenter';
import {
  POSTS_PER_PAGE,
  MAX_VISIBLE_PAGES,
  FREE_BOARD_TOPIC,
} from '../../constants';
import { useFilteredPosts } from '../../hooks/useFilteredPosts';
import { usePagination } from '../../hooks/usePagination';
import { useBoardSearch } from '../../hooks/useBoardSearch';
import { useBoardActions } from '../../hooks/useBoardActions';
import { useBoardStore } from '../../../stores/useBoardStore';
import { PostData } from '../../../types';

export default function FreeContainer() {
  const { allPosts } = useBoardStore();

  const {
    searchTerm,
    filterOption,
    inputValue,
    handleFilterChange,
    handleInputChange,
    handleSearch,
    resetSearchAndFilter,
  } = useBoardSearch({
    onSearch: () => {},
    onFilterChange: () => {},
    onResetPage: () => setCurrentPage(1),
  });

  const { filteredPosts } = useFilteredPosts({
    allPosts,
    searchTerm,
    filterOption,
    postTopic: FREE_BOARD_TOPIC,
  });

  const {
    currentPage,
    totalPages,
    startIndex,
    currentItems: postsToDisplay,
    setCurrentPage,
  } = usePagination<PostData>(filteredPosts, POSTS_PER_PAGE);

  const { handlePostClick, handleWriteClick } = useBoardActions({
    boardType: 'free',
  });

  const handleListClick = useCallback(() => {
    resetSearchAndFilter();
  }, [resetSearchAndFilter]);

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
    },
    [setCurrentPage]
  );

  return (
    <FreePresenter
      currentPosts={postsToDisplay}
      filteredPostsCount={filteredPosts.length}
      startIndex={startIndex}
      totalPages={totalPages}
      currentPage={currentPage}
      filterOption={filterOption}
      inputValue={inputValue}
      onPostClick={handlePostClick}
      onWriteClick={handleWriteClick}
      onListClick={handleListClick}
      onFilterChange={handleFilterChange}
      onInputChange={handleInputChange}
      onSearch={handleSearch}
      onPageChange={handlePageChange}
      postsPerPage={POSTS_PER_PAGE}
      maxVisiblePages={MAX_VISIBLE_PAGES}
    />
  );
}
