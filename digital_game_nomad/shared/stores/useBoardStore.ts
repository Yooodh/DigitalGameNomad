// package
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// layer
import { initialPosts, initialGameList } from '@/app/board/data';
import { formatDate } from '@/app/board/utils/formatDate';
import { BoardState } from '@/app/board/types';

export const useBoardStore = create<BoardState>()(
  persist(
    (set, _get) => ({
      allPosts: initialPosts.map((post) => ({
        ...post,
        dislikeCount: post.dislikeCount ?? 0,
      })),
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
      updatePost: (updatedPostData) =>
        set((state) => ({
          allPosts: state.allPosts.map((post) => {
            if (post.postKey === updatedPostData.postKey) {
              return {
                ...post,
                postTitle: updatedPostData.postTitle,
                postText: updatedPostData.postText,
                image_url: updatedPostData.image_url,
                isEdited: updatedPostData.isEdited,
                lastModifiedDate: updatedPostData.lastModifiedDate,
                ...(post.postTopic === '후기' && {
                  game_name: updatedPostData.game_name,
                  post_score: updatedPostData.post_score,
                }),
              };
            }
            return post;
          }),
          currentPost:
            state.currentPost?.postKey === updatedPostData.postKey
              ? {
                  ...state.currentPost,
                  postTitle: updatedPostData.postTitle,
                  postText: updatedPostData.postText,
                  image_url: updatedPostData.image_url,
                  isEdited: updatedPostData.isEdited,
                  lastModifiedDate: updatedPostData.lastModifiedDate,
                  ...(state.currentPost.postTopic === '후기' && {
                    game_name: updatedPostData.game_name,
                    post_score: updatedPostData.post_score,
                  }),
                }
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

      incrementDislikeCount: (postKey) =>
        set((state) => ({
          allPosts: state.allPosts.map((post) =>
            post.postKey === postKey
              ? { ...post, dislikeCount: (post.dislikeCount || 0) + 1 }
              : post
          ),
          currentPost:
            state.currentPost?.postKey === postKey
              ? {
                  ...state.currentPost,
                  dislikeCount: (state.currentPost.dislikeCount || 0) + 1,
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

      deleteComment: (postKey, commentId) =>
        set((state) => {
          const updatedComments = { ...state.commentsByPost };
          if (updatedComments[postKey]) {
            updatedComments[postKey] = updatedComments[postKey].filter(
              (comment) => comment.id !== commentId
            );
          }

          const updatedAllPosts = state.allPosts.map((post) =>
            post.postKey === postKey &&
            post.comments !== undefined &&
            post.comments > 0
              ? { ...post, comments: post.comments - 1 }
              : post
          );
          const updatedCurrentPost =
            state.currentPost?.postKey === postKey &&
            state.currentPost.comments !== undefined &&
            state.currentPost.comments > 0
              ? {
                  ...state.currentPost,
                  comments: state.currentPost.comments - 1,
                }
              : state.currentPost;

          return {
            commentsByPost: updatedComments,
            allPosts: updatedAllPosts,
            currentPost: updatedCurrentPost,
          };
        }),
      updateComment: (postKey, updatedCommentData) =>
        set((state) => {
          const updatedComments = { ...state.commentsByPost };
          if (updatedComments[postKey]) {
            updatedComments[postKey] = updatedComments[postKey].map((comment) =>
              comment.id === updatedCommentData.id
                ? {
                    ...comment,
                    content: updatedCommentData.content,
                    isEdited: true,
                    lastModifiedDate: formatDate(new Date().toISOString()),
                  }
                : comment
            );
          }
          return {
            commentsByPost: updatedComments,
          };
        }),
    }),
    {
      name: 'board-storage',
      storage: {
        getItem: (name) => {
          const value = localStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          localStorage.removeItem(name);
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
