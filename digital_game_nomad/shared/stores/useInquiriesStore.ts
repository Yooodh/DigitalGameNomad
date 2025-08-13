// package
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// slice
import { InquiriesState, InquiryData } from '../types';

export const useInquiriesStore = create<InquiriesState>()(
  persist(
    (set) => ({
      inquiries: [],
      addInquiry: (newInquiry) => {
        set((state) => {
          const id = Date.now().toString();
          const submittedAt = new Date().toISOString();

          const inquiryToAdd: InquiryData = {
            id,
            ...newInquiry,
            submittedAt,
            status: '접수',
            reply: undefined,
            replyDate: undefined,
          };

          return { inquiries: [...state.inquiries, inquiryToAdd] };
        });
      },
      updateInquiryStatus: (id, status) =>
        set((state) => ({
          inquiries: state.inquiries.map((inq) =>
            inq.id === id ? { ...inq, status } : inq
          ),
        })),
      saveInquiryReply: (id, replyContent) =>
        set((state) => ({
          inquiries: state.inquiries.map((inq) =>
            inq.id === id
              ? {
                  ...inq,
                  reply: replyContent,
                  replyDate: new Date().toISOString(),
                  status: '완료',
                }
              : inq
          ),
        })),
      deleteInquiries: (ids) =>
        set((state) => ({
          inquiries: state.inquiries.filter((inq) => !ids.includes(inq.id)),
        })),
    }),
    {
      name: 'user-inquiries-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
