// package
import { useState, useCallback } from 'react';

// slice
import { useBoardStore } from '../../../stores/useBoardStore';
import { formatDate } from '../../../utils/formatDate';
import { Comment } from '../../../types';

export function useCommentManager(
  postId: string | null,
  loggedInUserKey: number
) {
  const [newComment, setNewComment] = useState<string>('');
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedCommentContent, setEditedCommentContent] = useState<string>('');

  const { commentsByPost, addCommentToPost, deleteComment, updateComment } =
    useBoardStore();

  const currentPostComments = postId ? commentsByPost[postId] || [] : [];

  const handleCommentSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (!newComment.trim()) {
        alert('댓글 내용을 입력해주세요.');
        return;
      }

      if (!postId) {
        alert('게시글 ID를 찾을 수 없어 댓글을 작성할 수 없습니다.');
        return;
      }

      const comment: Comment = {
        id:
          currentPostComments.length > 0
            ? Math.max(...currentPostComments.map((c) => c.id)) + 1
            : 1,
        userName: '테스트 유저',
        content: newComment,
        date: formatDate(new Date().toISOString()),
        userKey: loggedInUserKey,
        isEdited: false,
        lastModifiedDate: undefined,
      };

      addCommentToPost(postId, comment);
      setNewComment('');
      alert('댓글이 작성되었습니다.');
    },
    [newComment, postId, currentPostComments, addCommentToPost, loggedInUserKey]
  );

  const handleDeleteComment = useCallback(
    (commentId: number) => {
      if (!postId) {
        alert('게시글 정보를 찾을 수 없어 댓글을 삭제할 수 없습니다.');
        return;
      }
      if (window.confirm('정말로 이 댓글을 삭제하시겠습니까?')) {
        deleteComment(postId, commentId);
        alert('댓글이 삭제되었습니다.');
      }
    },
    [postId, deleteComment]
  );

  const handleEditCommentClick = useCallback((comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditedCommentContent(comment.content);
  }, []);

  const handleSaveEditedComment = useCallback(
    (commentId: number) => {
      if (!postId) {
        alert('게시글 정보를 찾을 수 없어 댓글을 수정할 수 없습니다.');
        return;
      }
      if (!editedCommentContent.trim()) {
        alert('댓글 내용을 입력해주세요.');
        return;
      }

      const originalComment = currentPostComments.find(
        (c) => c.id === commentId
      );
      if (!originalComment) return;

      const updatedComment: Comment = {
        ...originalComment,
        content: editedCommentContent,
        isEdited: true,
        lastModifiedDate: formatDate(new Date().toISOString()),
      };

      updateComment(postId, updatedComment);
      setEditingCommentId(null);
      setEditedCommentContent('');
      alert('댓글이 수정되었습니다.');
    },
    [postId, editedCommentContent, currentPostComments, updateComment]
  );

  const handleCancelEditComment = useCallback(() => {
    setEditingCommentId(null);
    setEditedCommentContent('');
  }, []);

  return {
    newComment,
    setNewComment,
    editingCommentId,
    editedCommentContent,
    setEditedCommentContent,
    currentPostComments,
    handleCommentSubmit,
    handleDeleteComment,
    handleEditCommentClick,
    handleSaveEditedComment,
    handleCancelEditComment,
  };
}
