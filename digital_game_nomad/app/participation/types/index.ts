export type BoothSideProps = {
  boothSideVisible: Set<number>;
  setBoothSideRef: (element: HTMLDivElement | null, id: number) => void;
  textSectionsVisible: Set<number>;
  setTextSectionRef: (element: HTMLDivElement | null, id: number) => void;
};

export type BoothTopProps = {
  boothTopVisible: Set<number>;
  setBoothTopRef: (element: HTMLDivElement | null, id: number) => void;
};

export type CtaCardProps = {
  buttonNavVisible: Set<number>;

  setButtonNavRef: (el: HTMLDivElement | null, id: number) => void;
};

export type ParticipationServiceTextProps = {
  textSectionsVisible: Set<number>;
  setTextSectionRef: (element: HTMLDivElement | null, id: number) => void;
};

export type ParticipationPresenterProps = {
  navVisible: Set<number>;
  setNavRef: (el: HTMLDivElement | null, id: number) => void;
  boothSideVisible: Set<number>;
  setBoothSideRef: (el: HTMLDivElement | null, id: number) => void;
  textSectionsVisible: Set<number>;
  setTextSectionRef: (el: HTMLDivElement | null, id: number) => void;
  boothTopNavVisible: Set<number>;
  setBoothTopNavRef: (el: HTMLDivElement | null, id: number) => void;
  boothTopVisible: Set<number>;
  setBoothTopRef: (el: HTMLDivElement | null, id: number) => void;
  buttonNavVisible: Set<number>;
  setButtonNavRef: (el: HTMLDivElement | null, id: number) => void;
};
