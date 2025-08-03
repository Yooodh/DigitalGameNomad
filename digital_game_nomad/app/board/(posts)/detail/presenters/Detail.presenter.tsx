'use client';

// slice
import Actions from '../components/Actions';
import Interaction from '../components/Interaction';
import Header from '../components/Header';
import Content from '../components/Content';
import CommentSection from '../components/CommentSection';
import styles from '../styles/Detail.module.scss';
import { DetailPresenterProps } from '../types';

export default function DetailPresenter({
  currentPost,
  currentPostComments,
  newComment,
  setNewComment,
  handleCommentSubmit,
  handleImageLoad,
  handleImageError,
  imageLoading,
  imageError,
  handleLikeClick,
  handleDislikeClick,
  handleEditClick,
  handleDeleteClick,
  handleBackClick,
  loggedInUserKey,
  editingCommentId,
  editedCommentContent,
  setEditedCommentContent,
  handleDeleteComment,
  handleEditCommentClick,
  handleSaveEditedComment,
  handleCancelEditComment,
}: DetailPresenterProps) {
  const isAuthor = currentPost.userKey === loggedInUserKey;

  return (
    <div className={styles.detailContainer}>
      <div className={styles.sectionContainer}>
        <Header
          currentPost={currentPost}
          imageLoading={imageLoading}
          imageError={imageError}
        />

        <Content
          postText={currentPost.postText}
          imageUrl={currentPost.image_url}
          imageLoading={imageLoading}
          imageError={imageError}
          handleImageLoad={handleImageLoad}
          handleImageError={handleImageError}
        />

        <Interaction
          likeCount={currentPost.likeCount}
          dislikeCount={currentPost.dislikeCount}
          handleLikeClick={handleLikeClick}
          handleDislikeClick={handleDislikeClick}
        />

        <CommentSection
          currentPostComments={currentPostComments}
          newComment={newComment}
          setNewComment={setNewComment}
          handleCommentSubmit={handleCommentSubmit}
          loggedInUserKey={loggedInUserKey}
          editingCommentId={editingCommentId}
          editedCommentContent={editedCommentContent}
          setEditedCommentContent={setEditedCommentContent}
          handleDeleteComment={handleDeleteComment}
          handleEditCommentClick={handleEditCommentClick}
          handleSaveEditedComment={handleSaveEditedComment}
          handleCancelEditComment={handleCancelEditComment}
        />

        <Actions
          isAuthor={isAuthor}
          handleBackClick={handleBackClick}
          handleEditClick={handleEditClick}
          handleDeleteClick={handleDeleteClick}
        />
      </div>
    </div>
  );
}
