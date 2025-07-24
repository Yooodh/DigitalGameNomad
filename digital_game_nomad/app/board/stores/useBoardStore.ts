// package
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// slice
import { initialPosts, initialGameList } from '../data';
import { BoardState } from '../types';

export const useBoardStore = create<BoardState>()(
  persist(
    (set, _get) => ({
      allPosts: initialPosts,
      setAllPosts: (posts) => set({ allPosts: posts }),
      deletePost: (postKey) =>
        set((state) => ({
          allPosts: state.allPosts.filter((post) => post.postKey !== postKey),
          currentPost:
            state.currentPost?.postKey === postKey ? null : state.currentPost,
          commentsByPost: Object.fromEntries(
            Object.entries(state.commentsByPost).filter(
              ([key]) => key !== postKey
            )
          ),
        })),
      updatePost: (updatedPost) =>
        set((state) => ({
          allPosts: state.allPosts.map((post) =>
            post.postKey === updatedPost.postKey
              ? { ...updatedPost, postDate: post.postDate }
              : post
          ),
          currentPost:
            state.currentPost?.postKey === updatedPost.postKey
              ? { ...updatedPost, postDate: state.currentPost.postDate }
              : state.currentPost,
        })),
      addPost: (newPost) =>
        set((state) => ({
          allPosts: [newPost, ...state.allPosts],
          commentsByPost: {
            ...state.commentsByPost,
            [newPost.postKey]: [],
          },
        })),

      incrementViewCount: (postKey) =>
        set((state) => ({
          allPosts: state.allPosts.map((post) =>
            post.postKey === postKey
              ? { ...post, viewCount: (post.viewCount || 0) + 1 }
              : post
          ),
          currentPost:
            state.currentPost?.postKey === postKey
              ? {
                  ...state.currentPost,
                  viewCount: (state.currentPost.viewCount || 0) + 1,
                }
              : state.currentPost,
        })),

      incrementLikeCount: (postKey) =>
        set((state) => ({
          allPosts: state.allPosts.map((post) =>
            post.postKey === postKey
              ? { ...post, likeCount: (post.likeCount || 0) + 1 }
              : post
          ),
          currentPost:
            state.currentPost?.postKey === postKey
              ? {
                  ...state.currentPost,
                  likeCount: (state.currentPost.likeCount || 0) + 1,
                }
              : state.currentPost,
        })),

      currentPostTopic: null,
      setCurrentPostTopic: (topic) => set({ currentPostTopic: topic }),
      clearCurrentPostTopic: () => set({ currentPostTopic: null }),

      currentPost: null,
      setCurrentPost: (post) => {
        set({ currentPost: post });
        if (post?.postTopic) {
          set({ currentPostTopic: post.postTopic });
        }
      },
      clearCurrentPost: () => set({ currentPost: null }),

      previousTab: '전체',
      setPreviousTab: (tab) => set({ previousTab: tab }),

      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),

      selectedFilter: 'all',
      setSelectedFilter: (filter) => set({ selectedFilter: filter }),

      gameList: initialGameList,

      commentsByPost: {},
      addCommentToPost: (postKey, comment) =>
        set((state) => ({
          commentsByPost: {
            ...state.commentsByPost,
            [postKey]: [...(state.commentsByPost[postKey] || []), comment],
          },
          allPosts: state.allPosts.map((post) =>
            post.postKey === postKey
              ? { ...post, comments: (post.comments || 0) + 1 }
              : post
          ),
          currentPost:
            state.currentPost?.postKey === postKey
              ? {
                  ...state.currentPost,
                  comments: (state.currentPost.comments || 0) + 1,
                }
              : state.currentPost,
        })),
    }),
    {
      name: 'board-storage',
      storage: {
        getItem: (name) => {
          const value = sessionStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: (name, value) => {
          sessionStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          sessionStorage.removeItem(name);
        },
      },
      partialize: (state) =>
        ({
          currentPostTopic: state.currentPostTopic,
          previousTab: state.previousTab,
          commentsByPost: state.commentsByPost,
          allPosts: state.allPosts,
        } as BoardState),
      onRehydrateStorage: (state) => {
        if (state) {
          state.gameList = initialGameList;
          state.currentPost = null;
        }
      },
    }
  )
);
