import { ChangeEvent } from 'react';
import { PostData } from '../../types';

export type HeaderProps = {
  filteredPostsCount: number;
  onListClick: () => void;
  onWriteClick: () => void;
  boardTitle: string;
};

export type PaginationProps = {
  currentPosts: PostData[];
  filteredPostsCount: number;
  startIndex: number;
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  maxVisiblePages: number;
};

export type SearchProps = {
  filterOption: string;
  inputValue: string;
  onFilterChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
  searchOptions?: string[];
};

export type UseBoardActionsProps = {
  boardType: 'free' | 'review';
};

export type UseBoardSearchProps = {
  onSearch: (searchTerm: string) => void;
  onFilterChange: (filter: string) => void;
  onResetPage: () => void;
};

export type UseFilteredPostsProps = {
  allPosts: PostData[];
  searchTerm: string;
  filterOption: string;
  postTopic: string;
};

export type UseFilteredPostsResult = {
  filteredPosts: PostData[];
};

export type UsePaginationResult<T> = {
  currentPage: number;
  totalPages: number;
  startIndex: number;
  currentItems: T[];
  setCurrentPage: (page: number) => void;
};
