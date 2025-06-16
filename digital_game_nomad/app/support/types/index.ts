export type FaqItem = {
  id: number;
  question: string;
  answer: string;
};

export type FaqProps = {
  faqItems: FaqItem[];
  openFaq: number | null;
  toggleFaq: (id: number) => void;
};

export type ContactProps = {
  handleInquiryLinkClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

export type SupportPresenterProps = {
  faqItems: FaqItem[];
  openFaq: number | null;
  handleInquiryLinkClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  toggleFaq: (id: number) => void;
};

export type UserState = {
  loginUserKey?: number;
  loginUserGrade?: number;
};
