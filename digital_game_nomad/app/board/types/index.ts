export type PostData = {
  postKey: string;
  postTitle: string;
  postText: string;
  postDate: string;
  postTopic: BoardTopic;
  userKey: number;
  userName: string;
  viewCount: number;
  likeCount: number;
  image_url?: string;
  game_name?: string;
  post_score?: number;
  comments?: number;
};

export type BoardTopic = '자유' | '후기';
export type ActiveTab = '전체' | '자유' | '후기' | '글작성' | '상세보기';

export type Comment = {
  id: number;
  userName: string;
  content: string;
  date: string;
  userKey: number;
};

export type GameRating = {
  score: number;
  count: number;
};

export interface BoardState {
  allPosts: PostData[];
  setAllPosts: (posts: PostData[]) => void;
  deletePost: (postKey: string) => void;
  updatePost: (updatedPost: PostData) => void;
  addPost: (newPost: PostData) => void;
  incrementViewCount: (postKey: string) => void;
  incrementLikeCount: (postKey: string) => void;
  currentPostTopic: BoardTopic | null;
  setCurrentPostTopic: (topic: BoardTopic | null) => void;
  clearCurrentPostTopic: () => void;
  currentPost: PostData | null;
  setCurrentPost: (post: PostData | null) => void;
  clearCurrentPost: () => void;
  previousTab: ActiveTab;
  setPreviousTab: (tab: ActiveTab) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedFilter: 'all' | 'popular' | 'recent';
  setSelectedFilter: (filter: 'all' | 'popular' | 'recent') => void;
  gameList: string[];
  commentsByPost: Record<string, Comment[]>;
  addCommentToPost: (postKey: string, comment: Comment) => void;
}

export type HeaderProps = {
  title: string;
  subtitle?: string;
};

export type GameRatingSectionProps = {
  gameRatings: Record<string, GameRating>;
  mockGameList: string[];
};
export type TabType = '전체' | '자유' | '후기' | '글작성' | '상세보기';

export type NavigationProps = {
  activeTab: TabType;
  onTabClick: (tab: TabType) => void;
};

export type ReviewPresenterProps = {
  activeTab: TabType;
  onTabClick: (tab: TabType) => void;
};

export type PostListProps = {
  title: string;
  posts: PostData[];
  basePath: string;
  formatDate: (dateString: string) => string;
  isReviewSection?: boolean;
};

export type ScreenshotItem = {
  imageUrl: string;
  postKey: string;
  boardType: 'free' | 'review';
};

export type ScreenshotProps = {
  images: ScreenshotItem[];
};

export type BoardPresenterProps = {
  freePosts: PostData[];
  reviewPosts: PostData[];
  gameRatings: Record<string, GameRating>;
  mockGameList: string[];
  formatDate: (dateString: string) => string;
  latestScreenshots: ScreenshotItem[];
};

export type CommentData = {
  commentId: string;
  commentText: string;
  author: string;
  commentDate: string;
};

export type BoardStats = {
  freePostsTop10: PostData[];
  reviewPostsTop10: PostData[];
  gameRatings: Record<string, GameRating>;
  latestScreenshots: ScreenshotItem[];
};
