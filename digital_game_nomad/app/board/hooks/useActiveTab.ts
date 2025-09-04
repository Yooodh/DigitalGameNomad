// package
import { usePathname } from 'next/navigation';

// layer
import { useBoardStore } from '@/shared/stores/useBoardStore';

export function useActiveTab():
  | '전체'
  | '자유'
  | '후기'
  | '글작성'
  | '상세보기' {
  const pathname = usePathname();
  const { currentPostTopic } = useBoardStore();

  if (pathname.endsWith('/write')) {
    if (currentPostTopic) {
      return currentPostTopic;
    }
    return '글작성';
  }

  if (pathname.endsWith('/detail')) {
    if (currentPostTopic) {
      return currentPostTopic;
    }
    return '상세보기';
  }
  if (pathname.includes('/free')) return '자유';
  if (pathname.includes('/review')) return '후기';
  return '전체';
}
