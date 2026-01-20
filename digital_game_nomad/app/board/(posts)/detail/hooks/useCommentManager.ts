// package
import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';

// slice
import { formatDate } from '../../../utils/formatDate';
import { Comment } from '../../../types';

// layer
import { useBoardStore } from '@/shared/stores/useBoardStore';
import { getCurrentUserInfo } from '@/shared/utils/getCurrentUserInfo';
import { customConfirm } from '@/shared/utils/customConfirm';

export function useCommentManager(postId: string | null) {
  const [newComment, setNewComment] = useState<string>('');
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedCommentContent, setEditedCommentContent] = useState<string>('');

  const { commentsByPost, addCommentToPost, deleteComment, updateComment } =
    useBoardStore();

  const currentUser = getCurrentUserInfo();

  const currentPostComments = postId ? commentsByPost[postId] || [] : [];

  const handleCommentSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (!currentUser) {
        toast.info('로그인 후 이용해 주세요.');
        return;
      }

      if (!newComment.trim()) {
        toast.warning('댓글 내용을 입력해 주세요.');
        return;
      }

      if (!postId) {
        toast.error('게시글 ID를 찾을 수 없어 댓글을 작성할 수 없습니다.');
        return;
      }

      const comment: Comment = {
        id:
          currentPostComments.length > 0
            ? Math.max(...currentPostComments.map((c) => c.id)) + 1
            : 1,
        content: newComment,
        date: formatDate(new Date().toISOString()),
        userKey: currentUser.userKey,
        isEdited: false,
        lastModifiedDate: undefined,
      };

      addCommentToPost(postId, comment);
      setNewComment('');
      toast.success('댓글이 작성되었습니다.');
    },
    [newComment, postId, currentPostComments, addCommentToPost, currentUser]
  );

  const handleDeleteComment = useCallback(
    async (commentId: number) => {
      if (!currentUser) {
        toast.info('로그인 후 이용해 주세요.');
        return;
      }
      if (!postId) {
        toast.error('게시글 정보를 찾을 수 없어 댓글을 삭제할 수 없습니다.');
        return;
      }

      const confirmed = await customConfirm(
        '댓글 삭제',
        '댓글을 삭제하시겠습니까?'
      );

      if (confirmed) {
        deleteComment(postId, commentId);
        toast.success('댓글이 삭제되었습니다.');
      }
    },
    [postId, deleteComment, currentUser]
  );

  const handleEditCommentClick = useCallback((comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditedCommentContent(comment.content);
  }, []);

  const handleSaveEditedComment = useCallback(
    (commentId: number) => {
      if (!currentUser) {
        toast.info('로그인 후 이용해 주세요.');
        return;
      }
      if (!postId) {
        toast.error('게시글 정보를 찾을 수 없어 댓글을 수정할 수 없습니다.');
        return;
      }
      if (!editedCommentContent.trim()) {
        toast.warning('댓글 내용을 입력해 주세요.');
        return;
      }

      const originalComment = currentPostComments.find(
        (c) => c.id === commentId
      );
      if (!originalComment) return;

      if (originalComment.userKey !== currentUser.userKey) {
        toast.error('본인 댓글만 수정할 수 있습니다.');
        return;
      }

      const updatedComment: Comment = {
        ...originalComment,
        content: editedCommentContent,
        isEdited: true,
        lastModifiedDate: formatDate(new Date().toISOString()),
      };

      updateComment(postId, updatedComment);
      setEditingCommentId(null);
      setEditedCommentContent('');
      toast.success('댓글이 수정되었습니다.');
    },
    [
      postId,
      editedCommentContent,
      currentPostComments,
      updateComment,
      currentUser,
    ]
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
