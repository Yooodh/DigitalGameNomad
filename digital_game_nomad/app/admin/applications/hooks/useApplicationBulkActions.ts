// package
import { useCallback } from 'react';
import { toast } from 'react-toastify';

// slice
import { ApplicationData } from '../types';

// layer
import { useApplicationsStore } from '@/shared/stores/useApplicationsStore';
import { customConfirm } from '@/shared/utils/customConfirm';

const statusMap: Record<ApplicationData['status'], string> = {
  pending: '검토',
  approved: '승인',
  rejected: '거부',
};

export const useApplicationBulkActions = (
  selectedApplicationIds: Set<string>,
  clearSelection: () => void
) => {
  const bulkUpdateApplicationStatus = useApplicationsStore(
    (state) => state.bulkUpdateApplicationStatus
  );
  const deleteApplications = useApplicationsStore(
    (state) => state.deleteApplications
  );

  const onBulkStatusChange = useCallback(
    async (newStatus: ApplicationData['status']) => {
      const statusKor = statusMap[newStatus];

      const confirmed = await customConfirm(
        '상태 변경',
        `선택한 ${selectedApplicationIds.size}개의 항목을 '${statusKor}' 상태로 변경하시겠습니까?`
      );

      if (!confirmed) return;

      bulkUpdateApplicationStatus(
        Array.from(selectedApplicationIds),
        newStatus
      );
      clearSelection();
      toast.success('상태가 변경되었습니다.');
    },
    [bulkUpdateApplicationStatus, selectedApplicationIds, clearSelection]
  );

  const onBulkDelete = useCallback(async () => {
    if (selectedApplicationIds.size === 0) {
      toast.warning('삭제할 항목을 선택해 주세요.');
      return;
    }

    const confirmed = await customConfirm(
      '항목 삭제',
      `${selectedApplicationIds.size}개의 항목을 정말 삭제하시겠습니까?`
    );

    if (confirmed) {
      deleteApplications(Array.from(selectedApplicationIds));
      clearSelection();
      toast.success('삭제되었습니다.');
    }
  }, [deleteApplications, selectedApplicationIds, clearSelection]);

  return {
    onBulkStatusChange,
    onBulkDelete,
  };
};
