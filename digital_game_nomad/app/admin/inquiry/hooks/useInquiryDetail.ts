// package
import { useState, useCallback } from 'react';

// slice
import { Inquiry, InquiryStatus } from '../types';

export function useInquiryDetail(
  saveReplyToInquiry: (id: string, replyContent: string) => void,
  updateInquiryStatus: (id: string, newStatus: InquiryStatus) => void
) {
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const [isReplyMode, setIsReplyMode] = useState<boolean>(false);
  const [replyContent, setReplyContent] = useState<string>('');

  const openDetailModal = useCallback((inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setIsDetailModalOpen(true);
    setIsReplyMode(false);
    setReplyContent(inquiry.reply || '');
  }, []);

  const closeDetailModal = useCallback(() => {
    setIsDetailModalOpen(false);
    setSelectedInquiry(null);
    setIsReplyMode(false);
    setReplyContent('');
  }, []);

  const toggleReplyMode = useCallback(() => {
    setIsReplyMode((prev) => {
      const newReplyMode = !prev;
      if (newReplyMode && selectedInquiry?.reply) {
        setReplyContent(selectedInquiry.reply);
      } else if (!newReplyMode) {
        if (replyContent !== (selectedInquiry?.reply || '')) {
          setReplyContent(selectedInquiry?.reply || '');
        }
      }
      return newReplyMode;
    });
  }, [selectedInquiry, replyContent]);

  const handleSaveReply = useCallback(() => {
    if (!selectedInquiry || !replyContent.trim()) return;

    saveReplyToInquiry(selectedInquiry.id, replyContent);

    setSelectedInquiry((prev) =>
      prev
        ? {
            ...prev,
            reply: replyContent,
            replyDate: new Date().toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            }),
            status: '완료',
          }
        : null
    );

    setIsReplyMode(false);
    setReplyContent('');
  }, [selectedInquiry, replyContent, saveReplyToInquiry]);

  const cancelReply = useCallback(() => {
    setReplyContent(selectedInquiry?.reply || '');
    setIsReplyMode(false);
  }, [selectedInquiry]);

  const handleUpdateSelectedInquiryStatus = useCallback(
    (newStatus: InquiryStatus) => {
      if (selectedInquiry) {
        updateInquiryStatus(selectedInquiry.id, newStatus);
        setSelectedInquiry((prev) =>
          prev ? { ...prev, status: newStatus } : null
        );
      }
    },
    [selectedInquiry, updateInquiryStatus]
  );

  return {
    selectedInquiry,
    isDetailModalOpen,
    isReplyMode,
    replyContent,
    setReplyContent,
    openDetailModal,
    closeDetailModal,
    toggleReplyMode,
    saveReply: handleSaveReply,
    cancelReply,
    updateSelectedInquiryStatus: handleUpdateSelectedInquiryStatus,
  };
}
