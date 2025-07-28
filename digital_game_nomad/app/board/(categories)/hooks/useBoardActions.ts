// package
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

// slice
import { FREE_BOARD_TOPIC, REVIEW_BOARD_TOPIC } from '../constants';
import { UseBoardActionsProps } from '../types';
import { useBoardStore } from '../../stores/useBoardStore';

export function useBoardActions({ boardType }: UseBoardActionsProps) {
  const router = useRouter();
  const { setCurrentPostTopic, setPreviousTab } = useBoardStore();

  const currentBoardTopic =
    boardType === 'free' ? FREE_BOARD_TOPIC : REVIEW_BOARD_TOPIC;

  const handlePostClick = useCallback(
    (postId: string) => {
      router.push(`/board/detail?postId=${postId}&boardType=${boardType}`);
      setPreviousTab(currentBoardTopic);
    },
    [router, setPreviousTab, boardType, currentBoardTopic]
  );

  const handleWriteClick = useCallback(() => {
    setCurrentPostTopic(currentBoardTopic);
    router.push('/board/write');
  }, [router, setCurrentPostTopic, currentBoardTopic]);

  return {
    handlePostClick,
    handleWriteClick,
  };
}
