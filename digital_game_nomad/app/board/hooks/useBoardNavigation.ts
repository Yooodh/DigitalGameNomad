// package
import { useRouter } from 'next/navigation';

// slice
import { useBoardStore } from '../stores/useBoardStore';
import { TabType } from '../types';

export function useBoardNavigation() {
  const router = useRouter();
  const { setPreviousTab, setCurrentPostTopic } = useBoardStore();

  return (tab: TabType) => {
    setPreviousTab(tab);

    switch (tab) {
      case '전체':
        setCurrentPostTopic(null);
        router.push('/board');
        break;
      case '자유':
        setCurrentPostTopic('자유');
        router.push('/board/free');
        break;
      case '후기':
        setCurrentPostTopic('후기');
        router.push('/board/review');
        break;
      case '글작성':
        setCurrentPostTopic(null);
        router.push('/board/write');
        break;
      case '상세보기':
        setCurrentPostTopic(null);
        router.push('/board');
        break;
      default:
        router.push('/board');
        break;
    }
  };
}
