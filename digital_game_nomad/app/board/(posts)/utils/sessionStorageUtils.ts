export const sessionStorageUtils = {
  hasViewed: (postId: string): boolean => {
    const viewedPosts = JSON.parse(
      sessionStorage.getItem('viewedPosts') || '[]'
    );

    return viewedPosts.includes(postId);
  },

  addViewed: (postId: string) => {
    const viewedPosts = JSON.parse(
      sessionStorage.getItem('viewedPosts') || '[]'
    );

    if (!viewedPosts.includes(postId)) {
      viewedPosts.push(postId);
      sessionStorage.setItem('viewedPosts', JSON.stringify(viewedPosts));
    }
  },

  hasLiked: (postId: string): boolean => {
    const likedPosts = JSON.parse(sessionStorage.getItem('likedPosts') || '[]');

    return likedPosts.includes(postId);
  },

  addLiked: (postId: string) => {
    const likedPosts = JSON.parse(sessionStorage.getItem('likedPosts') || '[]');

    if (!likedPosts.includes(postId)) {
      likedPosts.push(postId);
      sessionStorage.setItem('likedPosts', JSON.stringify(likedPosts));
    }
  },

  hasDisliked: (postId: string): boolean => {
    const dislikedPosts = JSON.parse(
      sessionStorage.getItem('dislikedPosts') || '[]'
    );

    return dislikedPosts.includes(postId);
  },

  addDisliked: (postId: string) => {
    const dislikedPosts = JSON.parse(
      sessionStorage.getItem('dislikedPosts') || '[]'
    );

    if (!dislikedPosts.includes(postId)) {
      dislikedPosts.push(postId);
      sessionStorage.setItem('dislikedPosts', JSON.stringify(dislikedPosts));
    }
  },
};
