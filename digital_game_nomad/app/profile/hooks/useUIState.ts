// slice
import { useTabControl } from './useTabControl';
import { useFormatters } from '../utils/formatters';

export function useUIState() {
  const { activeTab, onSetActiveTab } = useTabControl('info');
  const { getGradeText, formatDate, getGradeIcon } = useFormatters();

  return {
    activeTab,
    onSetActiveTab,
    getGradeText,
    formatDate,
    getGradeIcon,
  };
}
