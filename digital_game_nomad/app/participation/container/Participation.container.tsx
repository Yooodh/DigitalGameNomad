'use client';

// slice
import ParticipationPresenter from '../presenter/Participation.presenter';

// layer
import { useIntersectionVisibility } from '@/shared/hooks/useIntersectionVisibility';

export default function ParticipationContainer() {
  const { visibleItems: navVisible, setItemRef: setNavRef } =
    useIntersectionVisibility<HTMLDivElement>(1);
  const { visibleItems: boothSideVisible, setItemRef: setBoothSideRef } =
    useIntersectionVisibility<HTMLDivElement>(1);
  const { visibleItems: textSectionsVisible, setItemRef: setTextSectionRef } =
    useIntersectionVisibility<HTMLDivElement>(8);
  const { visibleItems: boothTopNavVisible, setItemRef: setBoothTopNavRef } =
    useIntersectionVisibility<HTMLDivElement>(1);
  const { visibleItems: boothTopVisible, setItemRef: setBoothTopRef } =
    useIntersectionVisibility<HTMLDivElement>(1);
  const { visibleItems: buttonNavVisible, setItemRef: setButtonNavRef } =
    useIntersectionVisibility<HTMLDivElement>(1);

  const presenterProps = {
    navVisible,
    setNavRef,
    boothSideVisible,
    setBoothSideRef,
    textSectionsVisible,
    setTextSectionRef,
    boothTopNavVisible,
    setBoothTopNavRef,
    boothTopVisible,
    setBoothTopRef,
    buttonNavVisible,
    setButtonNavRef,
  };

  return <ParticipationPresenter {...presenterProps} />;
}
