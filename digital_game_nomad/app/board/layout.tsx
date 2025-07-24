'use client';

// slice
import Navigation from './components/Navigation';
import Header from './components/Header';
import { useActiveTab } from './hooks/useActiveTab';
import { useBoardNavigation } from './hooks/useBoardNavigation';
import { useBoardHeader } from './hooks/useBoardHeader';

export default function BoardLayout({
  children,
  postTopic,
}: {
  children: React.ReactNode;
  postTopic?: '자유' | '후기';
}) {
  const defaultActiveTab = useActiveTab();

  const activeTab = postTopic || defaultActiveTab;

  const handleTabClick = useBoardNavigation();
  const { title, subtitle } = useBoardHeader(activeTab);

  return (
    <>
      <Header title={title} subtitle={subtitle} />
      <Navigation activeTab={activeTab} onTabClick={handleTabClick} />
      <main>{children}</main>
    </>
  );
}
