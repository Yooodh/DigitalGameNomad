// package
import { useCallback, useMemo } from 'react';

// slice
import { Inquiry, InquiryStatus } from '../types';

// layer
import { useInquiriesStore } from '@/shared/stores/useInquiriesStore';
import { useRegisteredUsersStore } from '@/shared/stores/useRegisteredUsersStore';

export function useInquiries() {
  const allInquiries = useInquiriesStore((state) => state.inquiries);
  const updateInquiryStatusFromStore = useInquiriesStore(
    (state) => state.updateInquiryStatus
  );
  const saveInquiryReplyToStore = useInquiriesStore(
    (state) => state.saveInquiryReply
  );

  const registeredUsers = useRegisteredUsersStore((state) => state.users);

  const inquiries = useMemo(() => {
    return allInquiries.map((inquiry) => {
      const user = registeredUsers.find(
        (regUser) => regUser.email === inquiry.senderEmail
      );
      return {
        ...inquiry,
        content: inquiry.text,
        createdAt: inquiry.submittedAt,
        email: inquiry.senderEmail,
        nickName: user?.nickname,
        userName: user?.name,
        phone: user?.phone?.join('-'),
      } as Inquiry;
    });
  }, [allInquiries, registeredUsers]);

  const updateInquiryStatus = useCallback(
    (id: string, newStatus: InquiryStatus) => {
      updateInquiryStatusFromStore(id, newStatus);
    },
    [updateInquiryStatusFromStore]
  );

  const saveReplyToInquiry = useCallback(
    (id: string, replyContent: string) => {
      saveInquiryReplyToStore(id, replyContent);
    },
    [saveInquiryReplyToStore]
  );

  return {
    inquiries,

    updateInquiryStatus,
    saveReplyToInquiry,
  };
}
