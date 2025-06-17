export type AboutItem = {
  id: number;
  name: string;
  text: string;
  linkTo?: string;
};

export type ChatItemProps = {
  item: AboutItem;
  isSender: boolean;
  isVisible: boolean;
  setItemRef: (el: HTMLDivElement | null, id: number) => void;
};

export type PhoneFrameProps = {
  title: string;
  children: React.ReactNode;
};

export type AboutPresenterProps = {
  about: AboutItem[];
  visibleItems: Set<number>;
  setItemRef: (el: HTMLDivElement | null, id: number) => void;
};
