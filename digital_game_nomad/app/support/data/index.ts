import { FaqItem } from '../types';

export const faqItems: FaqItem[] = [
  {
    id: 1,
    question: '이용 방법을 알려주세요.',
    answer: ` 1. 관리자 계정: admin@test.com \n 2. 기업 회원 계정: company@test.com \n 3. 일반 회원 계정: user@test.com \n \n ※ 비밀번호는 모두 qwer1234! 입니다. \n 그 외 계정은 회원 가입 후 이용해 주세요.`,
  },
  {
    id: 2,
    question: '인증 번호를 알려주세요.',
    answer: `서비스 내 모든 인증 번호는 4자리에서 6자리 사이로, '123456' 순서대로 숫자를 입력해 주세요.`,
  },
  {
    id: 3,
    question: '디지털 게임 노마드가 무엇인가요?',
    answer:
      '디지털 게임 노마드는 디지털 노마드(Digital Nomad)와 게임(Game)의 합성어로, 시간과 장소에 관계 없이 언제든 박람회를 참관하여 새 게임을 접할 수 있는 서비스를 통칭하는 말입니다.',
  },
  {
    id: 4,
    question: '전시관은 어떻게 입장하나요?',
    answer:
      '메인페이지 > 로고 클릭 또는 소개페이지 > 전시관 입장하기로 입장 가능합니다.',
  },
  {
    id: 5,
    question: '게시글은 어떻게 쓰나요?',
    answer:
      '로그인 하신 후 자유게시판이나 후기 게시판 목록 상단의 글쓰기 버튼으로 게시판 글 작성이 가능합니다.',
  },
];
