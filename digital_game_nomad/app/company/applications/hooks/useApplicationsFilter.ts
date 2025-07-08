// package
import { useState, useMemo } from 'react';

// slice
import { ApplicationData } from '../types';

export const useApplicationsFilter = (applications: ApplicationData[]) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredApplications = useMemo(() => {
    if (!searchTerm) {
      return applications;
    }
    return applications.filter((app) =>
      app.gameName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [applications, searchTerm]);

  const onSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  return { searchTerm, filteredApplications, onSearchChange };
};
