// package
import { toast } from 'react-toastify';

// slice
import { usePostInteractions } from '../../hooks/usePostInteractions';

// layer
import { useBoardStore } from '@/shared/stores/useBoardStore';
import { getCurrentUserInfo } from '@/shared/utils/getCurrentUserInfo';
import { customConfirm } from '@/shared/utils/customConfirm';

export function useInteraction(postId: string) {
  const {
    handleLikeClick,
    handleDislikeClick,
    hasLiked,
    hasDisliked,
    hasReacted,
  } = usePostInteractions();

  const post = useBoardStore((state) =>
    state.allPosts.find((p) => p.postKey === postId)
  );
  const likeCount = post?.likeCount ?? 0;
  const dislikeCount = post?.dislikeCount ?? 0;

  const currentUser = getCurrentUserInfo();
  const isLoggedIn = !!currentUser;

  const alreadyLiked = hasLiked(postId);
  const alreadyDisliked = hasDisliked(postId);

  const likeBtnClass = hasReacted(postId) ? 'disabledBtn' : 'likeBtn';
  const dislikeBtnClass = hasReacted(postId) ? 'disabledBtn' : 'dislikeBtn';

  const onLike = async () => {
    if (!isLoggedIn) {
      toast.info('로그인 후 이용해 주세요.');
      return;
    }
    if (alreadyLiked) {
      toast.warning('이미 추천한 게시글입니다.');
      return;
    }
    if (alreadyDisliked) {
      toast.warning('이미 비공감한 게시글에는 추천할 수 없습니다.');
      return;
    }

    const confirmed = await customConfirm(
      '게시글 추천',
      '게시글을 추천하시겠습니까?'
    );
    if (!confirmed) return;

    handleLikeClick(postId);
    toast.success('게시글을 추천했습니다.');
  };

  const onDislike = async () => {
    if (!isLoggedIn) {
      toast.info('로그인 후 이용해 주세요.');
      return;
    }
    if (alreadyDisliked) {
      toast.warning('이미 비공감한 게시글입니다.');
      return;
    }
    if (alreadyLiked) {
      toast.warning('이미 추천한 게시글에는 비공감할 수 없습니다.');
      return;
    }

    const confirmed = await customConfirm(
      '게시글 비공감',
      '게시글을 비공감 하시겠습니까?'
    );
    if (!confirmed) return;

    handleDislikeClick(postId);
    toast.success('게시글을 비공감했습니다.');
  };

  return {
    likeCount,
    dislikeCount,
    likeBtnClass,
    dislikeBtnClass,
    onLike,
    onDislike,
  };
}
