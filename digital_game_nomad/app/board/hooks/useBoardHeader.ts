export function useBoardHeader(
  tab: '전체' | '자유' | '후기' | '글작성' | '상세보기'
) {
  switch (tab) {
    case '자유':
      return {
        title: '자유게시판',
        subtitle: '자유롭게 이야기를 나누는 공간입니다.',
      };
    case '후기':
      return {
        title: '후기게시판',
        subtitle: '게임 경험을 공유하는 공간입니다.',
      };
    default:
      return {
        title: '게시판',
        subtitle: '게임 정보를 공유하고 소통해보세요.',
      };
  }
}
