import { ChangeEvent } from 'react';
import { PostData } from '../../../types';

export type ReviewTableProps = {
  currentPosts: PostData[];
  filteredPostsCount: number;
  startIndex: number;
  onPostClick: (postId: string) => void;
};

export type ReviewPresenterProps = {
  currentPosts: PostData[];
  filteredPostsCount: number;
  startIndex: number;
  totalPages: number;
  currentPage: number;
  filterOption: string;
  inputValue: string;
  onPostClick: (postId: string) => void;
  onWriteClick: () => void;
  onListClick: () => void;
  onFilterChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
  onPageChange: (page: number) => void;
  postsPerPage: number;
  maxVisiblePages: number;
};
