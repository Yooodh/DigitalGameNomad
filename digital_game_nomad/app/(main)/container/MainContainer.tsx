'use client';

// package
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// slice
import MainPresenter from '../presenter/MainPresenter';

export default function MainContainer() {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsClicked(true);

    setTimeout(() => {
      router.push('/select');
    }, 1200);
  };

  return <MainPresenter isClicked={isClicked} onClick={handleClick} />;
}
