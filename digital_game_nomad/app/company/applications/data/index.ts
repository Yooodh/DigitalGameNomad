import { ApplicationData } from '../types/';

export const MOCK_APPLICATIONS: ApplicationData[] = [
  {
    id: '1',
    companyName: '넥슨',
    gameName: '던전앤파이터',
    description:
      '횡스크롤 액션 RPG의 대명사로, 화려한 스킬과 다양한 캐릭터, 그리고 깊이 있는 파밍 시스템을 자랑합니다. 꾸준한 업데이트로 사랑받는 스테디셀러입니다.',
    gameUrl: 'https://example.com/dnf',
    youtubeUrl: 'http://googleusercontent.com/youtube.com/dnf_promo',
    image: '/api/placeholder/300/200',
    submittedAt: '2024-06-01T09:00:00Z',
    status: 'rejected',
    contactEmail: 'contact@nexon.com',
    contactPhone: '+82-2-1111-2222',
    reviewedAt: '2024-06-02T10:30:00Z',
    notes: '전 세계적으로 높은 인기를 가진 게임.',
  },
  {
    id: '2',
    companyName: '넥슨',
    gameName: '카트라이더: 드리프트',
    description:
      '인기 레이싱 게임 카트라이더의 차세대 버전으로, 언리얼 엔진 기반의 고품질 그래픽과 향상된 드리프트 시스템을 경험할 수 있습니다. 다양한 캐릭터와 카트 커스터마이징이 특징입니다.',
    gameUrl: 'https://example.com/kartrider-drift',
    youtubeUrl: 'http://googleusercontent.com/youtube.com/kart_drift_trailer',
    image: '/api/placeholder/300/200',
    submittedAt: '2024-06-10T14:30:00Z',
    status: 'pending',
    contactEmail: 'contact@nexon.com',
    contactPhone: '+82-2-1111-2222',
    notes: '글로벌 유저 타겟팅 및 이스포츠 잠재력 검토 필요.',
  },
  {
    id: '3',
    companyName: '넥슨',
    gameName: '피파 온라인 4',
    description:
      'FIFA 공식 라이선스를 기반으로 한 축구 게임으로, 현실적인 그래픽과 실제 선수 데이터를 활용하여 몰입감 있는 축구 경험을 제공합니다. 다양한 게임 모드와 전략적인 팀 운영이 가능합니다.',
    gameUrl: 'https://example.com/fifa-online4',
    youtubeUrl: 'http://googleusercontent.com/youtube.com/fifa_ol4_highlight',
    image: '/api/placeholder/300/200',
    submittedAt: '2024-06-15T11:45:00Z',
    status: 'approved',
    contactEmail: 'contact@nexon.com',
    contactPhone: '+82-2-1111-2222',
    reviewedAt: '2024-06-16T13:00:00Z',
    reviewedBy: 'Admin Kim',
    notes: '꾸준한 유저 유입과 높은 DAU 유지.',
  },
];
