export const localStorageUtils = {
  hasViewed: (postId: string, userKey: string): boolean => {
    const key = `viewedPosts:${userKey}`;
    try {
      const viewedPosts = JSON.parse(localStorage.getItem(key) || '[]');
      return viewedPosts.includes(postId);
    } catch {
      return false;
    }
  },

  addViewed: (postId: string, userKey: string) => {
    const key = `viewedPosts:${userKey}`;
    try {
      const viewedPosts = JSON.parse(localStorage.getItem(key) || '[]');
      if (!viewedPosts.includes(postId)) {
        viewedPosts.push(postId);
        localStorage.setItem(key, JSON.stringify(viewedPosts));
      }
    } catch {
      localStorage.setItem(key, JSON.stringify([postId]));
    }
  },

  hasLiked: (postId: string, userKey: string): boolean => {
    const key = `likedPosts:${userKey}`;
    try {
      const likedPosts = JSON.parse(localStorage.getItem(key) || '[]');
      return likedPosts.includes(postId);
    } catch {
      return false;
    }
  },

  addLiked: (postId: string, userKey: string) => {
    const key = `likedPosts:${userKey}`;
    try {
      const likedPosts = JSON.parse(localStorage.getItem(key) || '[]');
      if (!likedPosts.includes(postId)) {
        likedPosts.push(postId);
        localStorage.setItem(key, JSON.stringify(likedPosts));
      }
    } catch {
      localStorage.setItem(key, JSON.stringify([postId]));
    }
  },

  hasDisliked: (postId: string, userKey: string): boolean => {
    const key = `dislikedPosts:${userKey}`;
    try {
      const dislikedPosts = JSON.parse(localStorage.getItem(key) || '[]');
      return dislikedPosts.includes(postId);
    } catch {
      return false;
    }
  },

  addDisliked: (postId: string, userKey: string) => {
    const key = `dislikedPosts:${userKey}`;
    try {
      const dislikedPosts = JSON.parse(localStorage.getItem(key) || '[]');
      if (!dislikedPosts.includes(postId)) {
        dislikedPosts.push(postId);
        localStorage.setItem(key, JSON.stringify(dislikedPosts));
      }
    } catch {
      localStorage.setItem(key, JSON.stringify([postId]));
    }
  },
};
