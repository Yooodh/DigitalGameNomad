'use client';

// package
import { useState } from 'react';

// slice
import SupportPresenter from '../presenter/SupportPresenter';
import { UserState } from '../types';
import { faqItems } from '../data';

export default function SupportContainer() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const user: UserState = {
    loginUserKey: undefined,
    loginUserGrade: undefined,
  };

  const handleInquiryLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    if (user.loginUserKey === undefined) {
      // event.preventDefault();
      // alert('로그인이 필요한 서비스입니다.');
    }
  };

  const toggleFaq = (id: number) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <SupportPresenter
      faqItems={faqItems}
      openFaq={openFaq}
      handleInquiryLinkClick={handleInquiryLinkClick}
      toggleFaq={toggleFaq}
    />
  );
}
