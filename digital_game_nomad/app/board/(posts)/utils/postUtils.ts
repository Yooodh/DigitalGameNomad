import { formatDate } from './../../utils/formatDate';
import { PostData } from './../../types';

export const postUtils = {
  generatePostKey: (): string => {
    return `new-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  },

  createNewPost: (data: {
    title: string;
    content: string;
    topic: '자유' | '후기';
    imageUrl?: string;
    gameName?: string;
    rating?: number;
    userKey: string;
    userName: string;
  }): PostData => {
    const basePost: PostData = {
      postKey: postUtils.generatePostKey(),
      postTitle: data.title,
      postText: data.content,
      postDate: formatDate(new Date().toISOString()),
      postTopic: data.topic,
      userKey: data.userKey,
      viewCount: 0,
      likeCount: 0,
      comments: 0,
      image_url: data.imageUrl,
    };

    if (data.topic === '후기') {
      return {
        ...basePost,
        game_name: data.gameName,
        post_score: data.rating,
      };
    }
    return basePost;
  },

  updatePost: (
    originalPost: PostData,
    updates: Partial<PostData>
  ): PostData => {
    return {
      ...originalPost,
      ...updates,
      isEdited: true,
      lastModifiedDate: formatDate(new Date().toISOString()),
    };
  },
};
