export function getUserGradeLabel(userGrade?: number | string) {
  switch (userGrade) {
    case 1:
    case '1':
      return '관리자';
    case 2:
    case '2':
      return '기업';
    case 3:
    case '3':
      return '일반';
    default:
      return '';
  }
}
