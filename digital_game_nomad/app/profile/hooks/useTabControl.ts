// package
import { useState, useCallback } from 'react';

export function useTabControl(initialTab: string = 'info') {
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  const onSetActiveTab = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  return {
    activeTab,
    onSetActiveTab,
  };
}
