// package
import { useState, useEffect, useMemo } from 'react';
import { UseFilteredPostsProps, UseFilteredPostsResult } from '../types';
import { PostData } from '../../types';

// layer
import { useRegisteredUsersStore } from '@/shared/stores/useRegisteredUsersStore';

export function useFilteredPosts({
  allPosts,
  searchTerm,
  filterOption,
  postTopic,
}: UseFilteredPostsProps): UseFilteredPostsResult {
  const [filteredPosts, setFilteredPosts] = useState<PostData[]>([]);

  const users = useRegisteredUsersStore((state) => state.users);

  const postsByTopic = useMemo(
    () => allPosts.filter((post) => post.postTopic === postTopic),
    [allPosts, postTopic]
  );

  useEffect(() => {
    const lowerSearchTerm = searchTerm.toLowerCase();

    let currentFiltered = postsByTopic.filter((post) => {
      switch (filterOption) {
        case '게임명':
          return (post.game_name || '').toLowerCase().includes(lowerSearchTerm);
        case '제목':
          return post.postTitle.toLowerCase().includes(lowerSearchTerm);
        case '닉네임': {
          const author = users.find((u) => u.id === post.userKey);
          const nickname = (
            author?.nickname ||
            author?.name ||
            ''
          ).toLowerCase();
          const userNameFromData = (post.userName || '').toLowerCase();
          return (
            nickname.includes(lowerSearchTerm) ||
            userNameFromData.includes(lowerSearchTerm)
          );
        }
        case '내용':
          return post.postText.toLowerCase().includes(lowerSearchTerm);
        case '제목+내용':
          return (
            post.postTitle.toLowerCase().includes(lowerSearchTerm) ||
            post.postText.toLowerCase().includes(lowerSearchTerm)
          );
        default:
          return true;
      }
    });

    currentFiltered.sort((a, b) => {
      const dateA = new Date(a.postDate);
      const dateB = new Date(b.postDate);
      return dateB.getTime() - dateA.getTime();
    });

    setFilteredPosts(currentFiltered);
  }, [searchTerm, filterOption, postsByTopic, users]);

  return { filteredPosts };
}
