// slice
import PostList from '../components/PostList';
import GameRatingSection from '../components/GameRatingSection';
import Screenshot from '../components/Screenshot';
import styles from '../styles/Board.module.scss';
import { BoardPresenterProps } from '../types';

export default function BoardPresenter({
  freePosts,
  reviewPosts,
  gameRatings,
  mockGameList,
  formatDate,
  latestScreenshots,
}: BoardPresenterProps) {
  return (
    <div className={styles.boardContainer}>
      <div className={styles.contentContainer}>
        <PostList
          title='🏆 자유게시판 TOP 10 🏆'
          posts={freePosts}
          basePath='/board/free'
          formatDate={formatDate}
        />

        <PostList
          title='🌟 후기게시판 TOP 10 🌟'
          posts={reviewPosts}
          basePath='/board/review'
          formatDate={formatDate}
          isReviewSection={true}
        />

        <GameRatingSection
          gameRatings={gameRatings}
          mockGameList={mockGameList}
        />
        {latestScreenshots.length > 0 && (
          <Screenshot images={latestScreenshots} />
        )}
      </div>
    </div>
  );
}
