// package
import Swal from 'sweetalert2';

export async function customConfirm(
  title: string,
  text: string
): Promise<boolean> {
  if (typeof window === 'undefined') {
    return false;
  }

  const isTablet = window.innerWidth <= 1024;

  const result = await Swal.fire({
    title,
    text,
    showCancelButton: true,
    confirmButtonText: '확인',
    cancelButtonText: '취소',
    allowOutsideClick: false,
    allowEscapeKey: false,
    scrollbarPadding: !isTablet,
  });

  return result.isConfirmed;
}
